import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const parseFecha = (fechaStr) => {
  if (!fechaStr) return null;
  const [d, m, y] = fechaStr.split('/');
  return new Date(`${y}-${m}-${d}`);
};

const Accidentes = () => {
  const [datos, setDatos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distritoSeleccionado, setDistritoSeleccionado] = useState('Todos');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/accidentes')
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener los datos:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtrados = [...todos];

    if (distritoSeleccionado !== 'Todos') {
      filtrados = filtrados.filter(a =>
        a.distrito?.toLowerCase() === distritoSeleccionado.toLowerCase()
      );
    }

    if (desde) {
      const fechaDesde = new Date(desde);
      filtrados = filtrados.filter(a => {
        const f = parseFecha(a.fecha);
        return f && f >= fechaDesde;
      });
    }

    if (hasta) {
      const fechaHasta = new Date(hasta);
      filtrados = filtrados.filter(a => {
        const f = parseFecha(a.fecha);
        return f && f <= fechaHasta;
      });
    }

    const conteo = {};
    filtrados.forEach((a) => {
      const tipo = a.tipoAccidente?.trim() || 'Desconocido';
      conteo[tipo] = (conteo[tipo] || 0) + 1;
    });

    const agrupados = Object.entries(conteo).map(([tipo, cantidad]) => ({
      tipo,
      cantidad
    }));

    setDatos(agrupados);
  }, [todos, distritoSeleccionado, desde, hasta]);

  const distritos = Array.from(new Set(todos.map(a => a.distrito).filter(Boolean))).sort();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '20px' }}
    >
      <h2>Accidentes por Tipo</h2>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
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
                Distrito:
                <select value={distritoSeleccionado} onChange={(e) => setDistritoSeleccionado(e.target.value)}>
                  <option value="Todos">Todos</option>
                  {distritos.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </label>

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
                setDistritoSeleccionado('Todos');
              }}>
                Limpiar filtros
              </button>
            </div>
          </fieldset>

          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={datos}
              layout="vertical"
              margin={{ top: 20, right: 30, bottom: 20, left: 200 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="tipo" type="category" width={200} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#8884d8" name="Número de Accidentes" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </motion.div>
  );
};

export default Accidentes;
