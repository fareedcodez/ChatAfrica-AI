import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as AfricaMapSVG } from '../assets/africa-lowjson.svg';
import './Map.css';

function Map() {
  return (
    <div className="Map">
      <h1>Map of Africa with Languages</h1>
      <div className="map-container">
        <AfricaMapSVG className="africa-map-svg" />
      </div>
      <nav>
        <Link to="/">Back to Home</Link>
        <Link to="/chat">Go to Chat</Link>
      </nav>
    </div>
  );
}

export default Map;
