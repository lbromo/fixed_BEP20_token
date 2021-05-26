var HDWalletProvider = require("truffle-hdwallet-provider");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PROJECT_ID = process.env.PROJECT_ID

const Web3 = require("web3");
const web3 = new Web3();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    
    ropsten: {
      provider: () => {
        return new HDWalletProvider(PRIVATE_KEY, `https://ropsten.infura.io/v3/${PROJECT_ID}`)
      },
      network_id: 3
    },

    mainnet: {
      provider: () => {
        return new HDWalletProvider(PRIVATE_KEY, `https://mainnet.infura.io/v3/${PROJECT_ID}`)
      },
      gasPrice: web3.utils.toWei('20', 'gwei'),
      gas: 1000000,
      network_id: 1
    },

    bsc_testnet: {
      provider: () => {
        return new HDWalletProvider(PRIVATE_KEY, `https://data-seed-prebsc-1-s1.binance.org:8545`)
      },
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
    },
  },

  compilers: {
    solc: {
      version: "0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 1000
        }
      //  evmVersion: "byzantium"
      }
    }
  }
};
