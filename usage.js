const { Web3 } = require("web3");
const PluginOptimizer = require("./plugin");

const web3 = new Web3("https://polygon-rpc.com");

web3.registerPlugin(new PluginOptimizer());

web3.optimizer.analyzeGasPriceOfTheLastBlocks(1000);
