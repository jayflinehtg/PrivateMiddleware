require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const privateKey = process.env.ACCOUNT_PRIVATE_KEY;
const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;

module.exports = {
  networks: {
    private: {
      provider: () => {
        if (!privateKey) {
          throw new Error("ACCOUNT_PRIVATE_KEY tidak ditemukan di .env");
        }
        if (!rpcUrl) {
          throw new Error("BLOCKCHAIN_RPC_URL tidak ditemukan di .env");
        }
        return new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: rpcUrl,
          numberOfAddresses: 1,
          shareNonce: true,
          pollingInterval: 1000,
        });
      },
      network_id: "*",
      host: "0.0.0.0",
      port: 7545,
      gas: 6721975,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 50,
      networkCheckTimeout: 10000,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
  contracts_directory: path.join(__dirname, "contracts"),
  contracts_build_directory: path.join(__dirname, "build", "contracts"),
};
