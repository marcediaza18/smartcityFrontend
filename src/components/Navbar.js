import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Smart City Monitor</h1>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/acustica">Acústica</Link></li>
        <li><Link to="/bicicletas">Bicicletas</Link></li>
        <li><Link to="/accidentes">Accidentes</Link></li>
        <li><Link to="/trafico">Tráfico</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
