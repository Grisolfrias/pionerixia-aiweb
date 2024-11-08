import React, { useState } from 'react';
import './Hero.css';

function Hero() {
    const [isLaunching, setIsLaunching] = useState(false);

    const handleLaunchClick = () => {
        setIsLaunching(true);
        setTimeout(() => {
            setIsLaunching(false);
            document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
        }, 4000); // Duración de la animación
    };

    return (
        <div className="hero">
            <h1>PionerixIA</h1>
            <p>“Conquista tu Presencia en el Universo Digital con Inteligencia Artificial”</p>
            <button onClick={handleLaunchClick} className="launch-btn">Despega con Nosotros</button>

            {isLaunching && (
                <div className="launch-animation">
                    <div className="countdown">3... 2... 1... ¡Despegue!</div>
                    <div className="rocket"></div>
                    <audio src="/sounds/launch-sound.mp3" autoPlay />
                </div>
            )}
        </div>
    );
}

export default Hero;
