import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Contaminación Acústica - LAeq24 por Estación</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Desde: <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Hasta: <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </label>
      </div>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filtrados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="estacion" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="laeq24" fill="#8884d8" name="LAeq 24h" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Acustica;
