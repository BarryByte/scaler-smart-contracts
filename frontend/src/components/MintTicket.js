import React, { useState } from "react";
import { ethers } from "ethers";
import TicketNFT from "../contracts/TicketNFT.json"; 

const MintTicket = () => {
  const [address, setAddress] = useState("");
  const [metadata, setMetadata] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const mintTicket = async () => {
    try {
      if (!window.ethereum) {
        setMessage("⚠️ MetaMask is not installed. Please install MetaMask.");
        return;
      }

      setLoading(true);
      setMessage("");

      if (!address || !metadata) {
        setMessage("⚠️ Please fill in all fields.");
        setLoading(false);
        return;
      }

      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // Check Wallet Connection
      setWalletConnected(true);

      // Create contract instance
      const contract = new ethers.Contract(contractAddress, TicketNFT.abi, signer);

      // Mint the ticket
      const tx = await contract.mintTicket(address, metadata);
      setMessage("⏳ Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setMessage("✅ Ticket minted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error minting ticket: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black p-6">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-white neon-text mb-6">
          🎟️ Mint a Ticket
        </h1>

        {/* Wallet Connection Status */}
        <p className={`text-center mb-4 ${walletConnected ? "text-green-400" : "text-red-400"}`}>
          {walletConnected ? "🟢 Wallet Connected" : "🔴 Wallet Not Connected"}
        </p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Recipient Address"
            className="border-2 border-gray-700 p-3 w-full rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Event Metadata"
            className="border-2 border-gray-700 p-3 w-full rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
          />
        </div>
        
        <button
          onClick={mintTicket}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-transform transform hover:scale-105 focus:outline-none ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-pink-500/50"
          }`}
          disabled={loading}
        >
          {loading ? "Minting..." : "🚀 Mint Ticket"}
        </button>

        {message && (
          <p className="mt-4 text-center text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default MintTicket;
