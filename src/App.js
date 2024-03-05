import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js'; // Add the '.js' extension here
import InputForm from './components/InputForm.js'; // Add the '.js' extension here
import SearchResults from './components/SearchResults.js'; // Add the '.js' extension here
import Footer from './components/Footer.js'; // Add the '.js' extension here

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