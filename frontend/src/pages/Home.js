import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const handleMint = () => {
    navigate('/mint'); // Adds '/mint' to the URL
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      {/* NFT Ticket Card */}
      <div className="relative z-10 bg-gray-900 text-white p-10 rounded-3xl shadow-2xl max-w-xl border-2 border-transparent 
        bg-gradient-to-br from-gray-800 to-black hover:border-pink-500 transition-all duration-300">

        {/* Ticket Title */}
        <h1 className="text-4xl font-extrabold text-neonPink tracking-wide text-center drop-shadow-lg">
          🎟 NFT Event Ticket
        </h1>

        {/* Ticket Details */}
        <p className="text-gray-300 mt-4 text-center">
          Secure your access to exclusive events with blockchain-powered NFT tickets.
        </p>

        {/* CTA Button */}
        <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold 
          text-lg rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-purple-500/50"
        onClick={handleMint}>
          Mint Your Ticket
        </button>

        {/* Icons Section */}
        <div className="mt-8 flex justify-center space-x-6">
          <div className="p-4 rounded-full bg-gray-800 shadow-lg hover:scale-110 transition-transform duration-300">
            <i className="fas fa-ticket-alt text-2xl text-white"></i>
          </div>
          <div className="p-4 rounded-full bg-gray-800 shadow-lg hover:scale-110 transition-transform duration-300">
            <i className="fas fa-wallet text-2xl text-white"></i>
          </div>
          <div className="p-4 rounded-full bg-gray-800 shadow-lg hover:scale-110 transition-transform duration-300">
            <i className="fas fa-check-circle text-2xl text-green-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;