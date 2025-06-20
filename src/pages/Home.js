import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [stats, setStats] = useState({
    accidentes: 0,
    bicicletas: 0,
    acustica: 0,
    trafico: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [a, b, c, d] = await Promise.all([
          axios.get('http://localhost:4000/api/accidentes'),
          axios.get('http://localhost:4000/api/bicicletas'),
          axios.get('http://localhost:4000/api/acustica'),
          axios.get('http://localhost:4000/api/trafico')
        ]);

        setStats({
          accidentes: a.data.length,
          bicicletas: b.data.length,
          acustica: new Set(c.data.map(e => e.estacion)).size,
          trafico: d.data.length
        });
      } catch (err) {
        console.error('Error al obtener estadísticas:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '40px' }}
    >
      <h1 style={{ marginBottom: '10px' }}>🌆 Smart City Dashboard</h1>
      <p style={{ maxWidth: '800px', lineHeight: '1.6' }}>
        Bienvenido a la plataforma de visualización urbana inteligente. Esta aplicación permite analizar y monitorizar distintos aspectos de la ciudad a través de datos abiertos:
      </p>
      <ul style={{ maxWidth: '800px', marginBottom: '30px' }}>
        <li><strong>Accidentes de tráfico</strong> con posibilidad de filtrar por fecha y distrito.</li>
        <li><strong>Uso del sistema de bicicletas</strong> públicas día a día.</li>
        <li><strong>Niveles de contaminación acústica</strong> por estaciones de medición.</li>
        <li><strong>Medición del tráfico urbano</strong> a través de sensores distribuidos en la ciudad.</li>
      </ul>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px'
      }}>
        <div style={cardStyle}>
          <h3>🚗 Accidentes</h3>
          <p style={numStyle}>{stats.accidentes}</p>
          <p>Registros históricos de siniestros urbanos con análisis por tipo.</p>
          <Link to="/accidentes" style={linkStyle}>Ver detalles →</Link>
        </div>

        <div style={cardStyle}>
          <h3>🚴 Bicicletas</h3>
          <p style={numStyle}>{stats.bicicletas}</p>
          <p>Días monitorizados con disponibilidad, uso y servicio de bicis públicas.</p>
          <Link to="/bicicletas" style={linkStyle}>Ver detalles →</Link>
        </div>

        <div style={cardStyle}>
          <h3>🔊 Acústica</h3>
          <p style={numStyle}>{stats.acustica}</p>
          <p>Estaciones activas de medición de ruido con análisis de LAeq24.</p>
          <Link to="/acustica" style={linkStyle}>Ver detalles →</Link>
        </div>

        <div style={cardStyle}>
          <h3>🚦 Tráfico</h3>
          <p style={numStyle}>{stats.trafico}</p>
          <p>Puntos de control con información sobre intensidad y localización del tráfico.</p>
          <Link to="/trafico" style={linkStyle}>Ver detalles →</Link>
        </div>
      </div>
    </motion.div>
  );
};

const cardStyle = {
  background: 'white',
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const numStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  margin: '10px 0'
};

const linkStyle = {
  marginTop: '10px',
  textDecoration: 'none',
  color: '#3498db',
  fontWeight: 'bold'
};

export default Home;
