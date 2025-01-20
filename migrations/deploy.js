// deployment script for TicketNFT
const hre = require("hardhat");

async function main() {
  // Compile the smart contract
  await hre.run('compile');

  console.log("Deploying TicketNFT contract...");

  // Get the contract factory
  const TicketNFT = await hre.ethers.getContractFactory("TicketNFT");

  // Deploy the contract
  const ticketNFT = await TicketNFT.deploy();

  // Wait for deployment to complete
  await ticketNFT.deployed();

  console.log("TicketNFT deployed to:", ticketNFT.address);

  // Wait for a few blocks to ensure the deployment is recognized by Etherscan
  console.log("Waiting for 15 confirmations...");
  await ticketNFT.deployTransaction.wait(15);  // Wait for 15 confirmations

  // Optional: Verify the contract on Etherscan (if using Hardhat Etherscan plugin)
  console.log("Verifying contract on Etherscan...");
  await hre.run("verify:verify", {
    address: ticketNFT.address,
    constructorArguments: [],
  });
}

// Error handling and script execution
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
