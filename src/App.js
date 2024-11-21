// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  const [language, setLanguage] = useState('es');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="App">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      <Hero />
    </div>
  );
}

export default App;
