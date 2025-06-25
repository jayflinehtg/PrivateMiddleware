require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    private: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.ACCOUNT_PRIVATE_KEY],
          providerOrUrl: process.env.BLOCKCHAIN_RPC_URL,
          chainId: 1337,
          pollingInterval: 8000,
          timeout: 60000,
        }),
      network_id: 1337,
      gas: 4500000,
      gasPrice: 0,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 100000,
      deploymentPollingInterval: 8000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  contracts_directory: path.join(__dirname, "contracts"),
  contracts_build_directory: path.join(__dirname, "build", "contracts"),
  mocha: {
    timeout: 100000,
  },
};
