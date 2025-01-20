# Scaler School of Technology - Smart Contracts Course

Welcome to the project repository for the Scaler School of Technology's **Smart Contracts Course**. This repository is designed as a template for your final project submission. Each group is expected to fork this repository, create a new branch, and make contributions to their fork before submitting their work via a pull request.

---

## 📖 Project Overview

This repository contains the final project submission for **Group 2**. The project is part of the Smart Contracts Course and is designed to apply the knowledge you have gained throughout the course.

Each group has the freedom to:
- **Choose any blockchain** platform (e.g., Ethereum, Solana, Polygon, etc.).
- **Select any project topic** that aligns with the principles of blockchain and smart contracts.

---

## 📋 Project Details

- **Project Name**: NFT Ticketing Platform
- **Blockchain Platform**: Ethereum
- **Network**: Sepolia
- **Deployed Smart Contract Address**: 0x3d94F86B92522ae2bB8AcC6E9d570880a96CAa74
- **Wallet Address**: 0x7936d757997C9197849aE6a318e27939D958348f
- **Frontend Repository/Code**: frontend/
- **Team Members**:
  1. **Name (GitHub ID)**: Kumar Kartikay (https://github.com/KKartikay-27)
  2. **Name (GitHub ID)**: Abhay Raj (https://github.com/barrybyte)
  3. **Name (GitHub ID)**: Harsh Kumar (https://github.com/Harsh-svg988)
- **Project Description**:  
  The NFT Ticketing Platform is a cutting-edge solution designed to revolutionize event ticketing by leveraging blockchain technology and NFTs (Non-Fungible Tokens). This platform enables event organizers to create and sell NFT-based tickets, offering attendees a secure and unique way to access events.


## 📂 Directory Structure

```plaintext
/
├── README.md               # This file
├── .gitignore              # Ignore unnecessary files
├── contracts/              # Place smart contracts here
├── tests/                  # Place test files here
├── migrations/             # Migration scripts (optional)
├── project/                # Placeholder for group project files
├── frontend/               # Place frontend code here
└── package.json            # Node.js-based dependencies (if applicable)
```
---

## How the Project Works (End-to-End Flow)
### 1️⃣ User Connects MetaMask
- Checks if MetaMask is installed.
- If the user has a wallet, it connects and saves this state in localStorage.

### 2️⃣ Minting an NFT Ticket
- User *inputs an Ethereum address and event details*.
- Calls mintTicket() from the smart contract.
- The ticket is minted and assigned to the given Ethereum address.

### 3️⃣ Viewing NFT Tickets
- Calls ticketCounter() to get the total number of minted tickets.
- Fetches metadata & owner details for each ticket.
- Displays all the tickets owned by the connected wallet.

---

## Steps to run locally

.env
```
ETHERSCAN_API_KEY=...
METAMASK_API_KEY=...
ACCOUNT_KEY=...
```

frontend/.env
```
CONTRACT_ADDRESS=...
```

Install npm
```
npm install
```

### To start frontend - 
```
cd frontend && npm start
```

### To verify contract is Deployed
```
npx hardhat verify --network sepolia ${CONTRACT-ADDRESS} 
```
### To run tests
```
npx hardhat test tests/TicketNFT.test.mjs 
```