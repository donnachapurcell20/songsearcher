import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import InputForm from './components/InputForm';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer'; // Import the Footer component

function App() {
  return (
    <Router>
      <div>
        <Header />
        <p>This is a paragraph before the InputForm.</p> {/* Add your paragraph */}
        <Routes>
          <Route path="/" element={<InputForm />} />
          <Route path="/search-tracks" element={<SearchResults />} />
          {/* Add more routes/components as needed */}
        </Routes>
        <Footer /> {/* Include the Footer component */}
      </div>
    </Router>
  );
}

export default App;

