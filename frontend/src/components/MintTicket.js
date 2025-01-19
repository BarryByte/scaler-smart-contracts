import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TicketNFT from "../contracts/TicketNFT.json";

const MintTicket = () => {
  const [address, setAddress] = useState("");
  const [metadata, setMetadata] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  // Function to check if the wallet is already connected
  const checkWalletConnection = async () => {
    const savedWalletConnected = localStorage.getItem("walletConnected");

    if (savedWalletConnected === "true" && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        setWalletConnected(true);
        setMessage("🟢 Wallet Connected Successfully!");
      } else {
        setMessage("⚠️ Wallet is not connected.");
      }
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setMessage("⚠️ MetaMask is not installed. Please install MetaMask.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        setWalletConnected(true);
        localStorage.setItem("walletConnected", "true");
        setMessage("🟢 Wallet Connected Successfully!");
      }
    } catch (error) {
      setMessage("❌ Error connecting wallet: " + error.message);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setWalletConnected(false);
      setCurrentAccount(null);
      setMessage("⚠️ Wallet disconnected.");
      localStorage.removeItem("walletConnected");
    } else {
      setCurrentAccount(accounts[0]);
      setMessage("🟢 Wallet account changed.");
    }
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    setCurrentAccount(null);
    setMessage("⚠️ Wallet disconnected.");
    localStorage.removeItem("walletConnected");
  };

  useEffect(() => {
    checkWalletConnection(); // Check wallet connection on load

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("disconnect", handleDisconnect);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 8000);

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [message]);

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

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress, TicketNFT.abi, signer);

      const tx = await contract.mintTicket(address, metadata);
      setMessage("⏳ Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setMessage("✅ Ticket minted successfully!");
    } catch (error) {
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

        <p className={`text-center mb-4 ${walletConnected ? "text-green-400" : "text-red-400"}`}>
          {walletConnected ? `🟢 Wallet Connected` : "🔴 Wallet Not Connected"}
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

        {!walletConnected ? (
          <button
            onClick={connectWallet}
            className="w-full py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-pink-500/50 transition-transform transform hover:scale-105 focus:outline-none"
          >
            Connect Wallet
          </button>
        ) : (
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
        )}

        {message && (
          <p className="mt-4 text-center text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
};

export default MintTicket;
