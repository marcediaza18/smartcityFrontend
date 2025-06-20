import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', background: '#f0f0f0' }}>
    <Link to="/">Home</Link> |{" "}
    <Link to="/acustica">Contaminación Acústica</Link> |{" "}
    <Link to="/bicicletas">Bicicletas</Link> |{" "}
    <Link to="/accidentes">Accidentes</Link>
  </nav>
);

export default Navbar;
