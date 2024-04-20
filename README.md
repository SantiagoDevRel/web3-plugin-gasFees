# web3-plugin-gasFees

# Usage

Installation

```bash
npm i web3-plugin-gasfees
```

```js
//import Web3 and Plugin
const { Web3 } = require("web3");
const PluginOptimizer = require("web3-plugin-gasfees");

//initialize provider (Ethereum mainnet)
const web3 = new Web3("https://eth.llamarpc.com");

//register plugin (give context of current provider)
web3.registerPlugin(new PluginOptimizer());

//check average, minimum and current gas price of the last `1000` amount of blocks on ethereum mainnet
web3.optimizer.analyzeGasPriceOfTheLastBlocks(1000);

//check average, minimum and current gas price of the last `50` amount of blocks on ethereum mainnet
web3.optimizer.analyzeGasPriceOfTheLastBlocks(50);

//set other provider (Polygon mainnet)
web3.setProvider("https://polygon-rpc.com");

//check average, minimum and current gas price of the last `100` amount of blocks on poylgon mainnet
web3.optimizer.analyzeGasPriceOfTheLastBlocks(100);

//check average, minimum and current gas price of the last `20` amount of blocks on polygon mainnet
web3.optimizer.analyzeGasPriceOfTheLastBlocks(20);
```
