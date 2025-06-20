import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';
import { motion } from 'framer-motion';

const parseFecha = (str) => {
  const [mes, año] = str.split('-');
  return new Date(`${año}-01-${mes}`);
};

const Acustica = () => {
  const [datos, setDatos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/acustica')
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener los datos:', err);
        setLoading(false);
      });
  }, []);

  const filtrados = todos.filter((d) => {
    const fecha = parseFecha(d.fecha);
    if (desde && fecha < new Date(desde)) return false;
    if (hasta && fecha > new Date(hasta)) return false;
    return true;
  });

  const laeqPorEstacion = () => {
    const resumen = {};

    filtrados.forEach(d => {
      const raw = d.estacion || 'Desconocida';
      const key = raw.startsWith('NMT-') ? raw : `NMT-${raw.padStart(2, '0')}`;

      if (!resumen[key]) resumen[key] = { total: 0, count: 0 };
      resumen[key].total += d.laeq24;
      resumen[key].count += 1;
    });

    return Object.entries(resumen)
      .map(([estacion, { total, count }]) => ({
        estacion,
        laeq24: parseFloat((total / count).toFixed(2))
      }))
      .sort((a, b) => b.laeq24 - a.laeq24); // De mayor a menor ruido
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '20px' }}
    >
      <h2>Contaminación Acústica - Nivel Medio LAeq24 por Estación (dB)</h2>

      <fieldset style={{
        border: '1px solid #ccc',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa'
      }}>
        <legend><strong>Filtros</strong></legend>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          <label>
            Desde:
            <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
          </label>
          <label>
            Hasta:
            <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
          </label>
          <button onClick={() => {
            setDesde('');
            setHasta('');
          }}>
            Limpiar filtros
          </button>
        </div>
      </fieldset>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={laeqPorEstacion()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="estacion"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={80}
              label={{ value: 'Estación de medición', position: 'insideBottom', offset: -60 }}
            />
            <YAxis>
              <Label
                value="LAeq 24h (dB)"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="laeq24" fill="#8884d8" name="Media LAeq24 (dB)" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default Acustica;
