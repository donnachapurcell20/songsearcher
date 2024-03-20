
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import InputForm from './components/InputForm.js'; 
import SearchResults from './components/SearchResults.js'; 
import Footer from './components/Footer.js'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<InputForm />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
