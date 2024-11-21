// src/components/VideoSection.js
import React from 'react';
import './VideoSection.css';

function VideoSection() {
  return (
    <div className="video-section">
      <iframe
  src="https://www.youtube.com/embed/pt0-xcVWeis?autoplay=1&mute=1&controls=0&loop=1&playlist=pt0-xcVWeis"
  title="Video de Fondo"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  class="background-video"
></iframe>

      <div className="video-overlay">
        <h2>Explora el poder de la IA con PionerixIA</h2>
        <p>Descubre cómo nuestra tecnología puede transformar tu negocio.</p>
      </div>
    </div>
  );
}

export default VideoSection;
