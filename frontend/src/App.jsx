import React from "react";
import { Route, Routes } from "react-router-dom";
import Emordnilap from "./pages/Emordnilap";
import HomePage from "./pages/HomePage";
import Palindrome from "./pages/Palindrome";
import Navbar from "./components/Navbar";
import "./global.css";

function App() {
  return (
    <div className="app-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/palindrome" element={<Palindrome />} />
        <Route path="/emordnilap" element={<Emordnilap />} />
      </Routes>
    </div>
  );
}

export default App;
