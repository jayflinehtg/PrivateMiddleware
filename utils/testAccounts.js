const Web3 = require("web3").Web3;
const dotenv = require("dotenv");
dotenv.config();

// Initialize Web3 dengan Ganache
const web3 = new Web3(process.env.BLOCKCHAIN_RPC_URL || "http://0.0.0.0:7545");

// Hardcoded test accounts dari Ganache Anda
const TEST_ACCOUNTS = [
  {
    id: "testUser1",
    privateKey:
      "0x049363b6ec6fe0743fefc18c442b0e9b94cd173df345dac79fed6eddfd1016c8",
    fullName: "Test User 1 - Performance",
  },
  {
    id: "testUser2",
    privateKey:
      "0xe8977f8b5f642c4026b8ced1a3e18f79b4673934e081de8a06760ffa58a026d4",
    fullName: "Test User 2 - Performance",
  },
  {
    id: "testUser3",
    privateKey:
      "0xc0325f660574a4267499d8adfed326285f84b7181952acf9c8107a6a2e11e528",
    fullName: "Test User 3 - Performance",
  },
];

// Create wallet dengan test accounts
const performanceWallet = web3.eth.accounts.wallet.create(0); // Create empty wallet

// Add test accounts ke wallet
TEST_ACCOUNTS.forEach((account) => {
  try {
    performanceWallet.add(account.privateKey);
    console.log(
      `✅ Added ${account.id} to wallet: ${
        performanceWallet[performanceWallet.length - 1].address
      }`
    );
  } catch (error) {
    console.error(`❌ Error adding ${account.id} to wallet:`, error.message);
  }
});

// Debug: Print wallet contents
console.log(`🔍 Wallet contains ${performanceWallet.length} accounts`);
performanceWallet.forEach((account, index) => {
  console.log(`   Index ${index}: ${account.address}`);
});

// Fungsi untuk mendapatkan account dari wallet berdasarkan ID
function getTestAccountFromWallet(userId) {
  console.log(`🔍 Looking for userId: ${userId}`);
  console.log(`🔍 Available TEST_ACCOUNTS:`, TEST_ACCOUNTS.map(acc => acc.id));
  
  const accountIndex = TEST_ACCOUNTS.findIndex(acc => acc.id === userId);
  console.log(`🔍 Found accountIndex: ${accountIndex}`);

  if (accountIndex === -1) return null;

  return {
    ...TEST_ACCOUNTS[accountIndex],
    address: performanceWallet[accountIndex].address,
    walletAccount: performanceWallet[accountIndex],
  };
}

// Fungsi untuk send transaction menggunakan wallet
async function sendTransactionWithWallet(userId, transactionObject) {
  const account = getTestAccountFromWallet(userId);
  if (!account) {
    throw new Error(`Test account ${userId} not found`);
  }

  // Set from address
  transactionObject.from = account.address;

  console.log(
    `🔄 Sending transaction from ${account.fullName} (${account.address})`
  );

  // Send transaction menggunakan wallet (otomatis signing)
  const receipt = await web3.eth.sendTransaction(transactionObject);

  console.log(`✅ Transaction successful! Hash: ${receipt.transactionHash}`);
  return receipt;
}

module.exports = {
  TEST_ACCOUNTS,
  performanceWallet,
  web3,
  getTestAccountFromWallet,
  sendTransactionWithWallet,
};
