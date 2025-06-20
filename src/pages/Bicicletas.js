import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const parseFecha = (str) => {
  const [d, m, y] = str.split('/');
  return new Date(`${y}-${m}-${d}`);
};

const Bicicletas = () => {
  const [datos, setDatos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/bicicletas')
      .then((res) => {
        const ordenados = res.data.map((d) => ({
          ...d,
          totalUsos: Number(d.totalUsos),
          usosAnual: Number(d.usosAnual),
          usosOcasional: Number(d.usosOcasional)
        })).sort((a, b) => parseFecha(a.dia) - parseFecha(b.dia));

        setTodos(ordenados);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener los datos:', err);
        setLoading(false);
      });
  }, []);

  const filtrados = todos.filter((d) => {
    const fecha = parseFecha(d.dia);
    if (desde && fecha < new Date(desde)) return false;
    if (hasta && fecha > new Date(hasta)) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '20px' }}
    >
      <h2>Estadísticas de Uso de Bicicletas Públicas</h2>

      <div style={{ background: '#f0f8ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p>
          La siguiente gráfica representa los <strong>usos diarios</strong> del sistema público de bicicletas,
          incluyendo <strong>abonados anuales</strong> y <strong>ocasionales</strong>. Puedes aplicar un filtro por rango de fechas.
        </p>
      </div>

      <fieldset style={{
        border: '1px solid #ccc',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa'
      }}>
        <legend><strong>Filtros por fecha</strong></legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          <label>
            Desde:<br />
            <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
          </label>
          <label>
            Hasta:<br />
            <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
          </label>
          <button onClick={() => { setDesde(''); setHasta(''); }}>
            Limpiar filtros
          </button>
        </div>
      </fieldset>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={filtrados} margin={{ top: 10, right: 30, bottom: 60, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="dia"
              angle={-45}
              textAnchor="end"
              interval={30}
              height={70}
            />
            <YAxis label={{ value: 'Cantidad de usos', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line type="monotone" dataKey="totalUsos" stroke="#0077b6" name="Total de usos" dot={false} />
            <Line type="monotone" dataKey="usosAnual" stroke="#43aa8b" name="Usos anuales" dot={false} />
            <Line type="monotone" dataKey="usosOcasional" stroke="#f8961e" name="Usos ocasionales" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default Bicicletas;
