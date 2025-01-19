require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan"); 


module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/df94bbdf49644d4189c9ccd421883c29",
      accounts: [`0x896e4555f82f1e0f6477e3e9cc6b684f12a10ac1961acb60e20b2bb56a5b00df`]
    }
  },
  etherscan: {
    apiKey: "4KNG4GQ1UG2J6FWSCG789FYZDURSV5AFG3",
  },
};
