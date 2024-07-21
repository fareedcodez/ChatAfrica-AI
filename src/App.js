import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatComponent from './pages/chat';
import Home from './pages/Home';
import Map from './pages/Map';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatComponent />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
