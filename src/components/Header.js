// src/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="Logo" />
        <h1>Your App Name</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search-tracks">Search Tracks</Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
}

export default Header;
