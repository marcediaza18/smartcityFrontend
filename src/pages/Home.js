import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stats, setStats] = useState({
    accidentes: 0,
    bicicletas: 0,
    acustica: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [a, b, c] = await Promise.all([
          axios.get('http://localhost:4000/api/accidentes'),
          axios.get('http://localhost:4000/api/bicicletas'),
          axios.get('http://localhost:4000/api/acustica')
        ]);

        setStats({
          accidentes: a.data.length,
          bicicletas: b.data.length,
          acustica: new Set(c.data.map(e => e.estacion)).size
        });
      } catch (err) {
        console.error('Error al obtener estadísticas:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>📊 Dashboard Smart City</h1>
      <p>Visualiza datos urbanos clave de forma centralizada:</p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1, background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h3>Accidentes</h3>
          <p>Total registros: <strong>{stats.accidentes}</strong></p>
          <Link to="/accidentes">→ Ver detalles</Link>
        </div>

        <div style={{ flex: 1, background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h3>Bicicletas</h3>
          <p>Días registrados: <strong>{stats.bicicletas}</strong></p>
          <Link to="/bicicletas">→ Ver detalles</Link>
        </div>

        <div style={{ flex: 1, background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h3>Contaminación Acústica</h3>
          <p>Estaciones activas: <strong>{stats.acustica}</strong></p>
          <Link to="/acustica">→ Ver detalles</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
