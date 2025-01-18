import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MintTicket from "./components/MintTicket";
import ViewTickets from "./components/ViewTickets";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<MintTicket />} />
          <Route path="/view" element={<ViewTickets />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
