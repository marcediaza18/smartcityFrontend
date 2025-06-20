import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Acustica from './pages/Acustica';
import Bicicletas from './pages/Bicicletas';
import Accidentes from './pages/Accidentes';
import Trafico from './pages/Trafico';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acustica" element={<Acustica />} />
        <Route path="/bicicletas" element={<Bicicletas />} />
        <Route path="/accidentes" element={<Accidentes />} />
        <Route path="/trafico" element={<Trafico />} />
      </Routes>
    </Router>
  );
}

export default App;
