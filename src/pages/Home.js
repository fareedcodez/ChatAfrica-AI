import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
// import heroImage from '../assets/hero-image.jpg'; 
// import languageMapImage from '../assets/language-map.jpg'; 

function Home() {
  return (
    <div className="home">
      <header className="hero">
        {/* <img src={heroImage} alt="African Landscape" className="hero-image" /> */}
        <div className="hero-text">
          <h1>Babel Africa</h1>
          <p>Bridging languages, connecting cultures</p>
        </div>
      </header>
      <section className="content">
        <h2>Welcome to Our African Translation Hub</h2>
        <p>
          Explore the rich tapestry of African languages with our powerful translation tool. 
          From Swahili to Zulu, Yoruba to Amharic, we're here to help you communicate across borders.
        </p>
        <div className="cta-buttons">
          <Link to="/chat" className="cta-button primary">Start Translating</Link>
          <Link to="/map" className="cta-button secondary">Explore Language Map</Link>
        </div>
        {/* <div className="image-section">
          <img src={languageMapImage} alt="Language Map of Africa" className="map-image" />
        </div> */}
      </section>
      <footer className="footer">
        <p>Celebrating the linguistic diversity of Africa</p>
      </footer>
    </div>
  );
}

export default Home;
