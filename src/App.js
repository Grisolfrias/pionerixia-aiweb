// src/App.js
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import IntroCarga from './components/IntroCarga';
import Private from './components/Private';
import VideoSection from './components/VideoSection';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showIntro ? <IntroCarga /> : <Hero />}
      <VideoSection /> {/* Asegúrate de que VideoSection esté aquí */}
      <Private />
    </div>
  );
}

export default App;
