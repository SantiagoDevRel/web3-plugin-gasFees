const { Web3PluginBase, eth, FMT_NUMBER } = require("web3");

class PluginOptimizer extends Web3PluginBase {
  pluginNamespace = "optimizer";

  async getGasPricesForLastBlocks(numberOfBlocks) {
    const latestBlockNumber = await eth.getBlockNumber(this, { number: FMT_NUMBER.NUMBER });
    const blockNumbers = Array.from({ length: numberOfBlocks }, (_, i) => latestBlockNumber - i);

    let baseFeePerGasValues = [];

    for (let i = 0; i < blockNumbers.length; i++) {
      const blockNumber = blockNumbers[i];
      const block = await eth.getBlock(this, blockNumber, undefined, { number: FMT_NUMBER.NUMBER });

      if (block) {
        const baseFeePerGas = block.baseFeePerGas;
        if (baseFeePerGas) {
          baseFeePerGasValues.push(baseFeePerGas);
        }
      }
    }

    return baseFeePerGasValues;
  }

  async analyzeGasPriceOfTheLastBlocks(numberOfBlocks) {
    const baseFeePerGasValues = await this.getGasPricesForLastBlocks(numberOfBlocks);

    // Convert gas prices to BigInt
    const baseFeePerGasValuesBigInt = baseFeePerGasValues.map((val) => BigInt(val));

    // Calculate average gas price
    const sumGasPrices = baseFeePerGasValuesBigInt.reduce((acc, val) => acc + val, BigInt(0));
    const averageGasPrice = sumGasPrices / BigInt(baseFeePerGasValuesBigInt.length);

    // Find minimum gas price
    const minGasPrice = baseFeePerGasValuesBigInt.reduce((min, val) => (val < min ? val : min), baseFeePerGasValuesBigInt[0]);

    console.log("Average Gas Price:", Number(averageGasPrice));
    console.log("Minimum Gas Price:", Number(minGasPrice));
    console.log("Current Gas Price:", (await eth.getBlock(this, undefined, undefined, { number: FMT_NUMBER.NUMBER })).baseFeePerGas);
  }
}

module.exports = PluginOptimizer;
