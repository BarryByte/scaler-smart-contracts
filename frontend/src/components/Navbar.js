import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-lg p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-3xl font-extrabold tracking-wide neon-text hover:scale-105 transition-transform duration-300">
          🎟️ TicketNFT
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink to="/" text="Home" />
          <NavLink to="/mint" text="Mint Ticket" />
          <NavLink to="/view" text="View Tickets" />
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component with hover effects
const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="relative text-white text-lg font-medium transition-all duration-300 transform hover:scale-110 
        after:content-[''] after:absolute after:w-full after:h-1 after:bg-pink-500 after:left-0 after:-bottom-2 after:opacity-0 hover:after:opacity-100"
    >
      {text}
    </Link>
  );
};

export default Navbar;
