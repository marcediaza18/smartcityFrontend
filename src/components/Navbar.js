import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    backgroundColor: '#2c3e50',
    padding: '10px 20px',
    display: 'flex',
    gap: '20px'
  }}>
    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
    <Link to="/acustica" style={{ color: 'white', textDecoration: 'none' }}>Contaminación Acústica</Link>
    <Link to="/bicicletas" style={{ color: 'white', textDecoration: 'none' }}>Bicicletas</Link>
    <Link to="/accidentes" style={{ color: 'white', textDecoration: 'none' }}>Accidentes</Link>
  </nav>
);

export default Navbar;
