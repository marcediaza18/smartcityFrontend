import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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
        const ordenados = [...res.data].sort((a, b) =>
          parseFecha(a.dia) - parseFecha(b.dia)
        );
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
    <div style={{ padding: '20px' }}>
      <h2>Uso de Bicicletas por Día</h2>

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
          <LineChart data={filtrados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalUsos" stroke="#8884d8" name="Total Usos" />
            <Line type="monotone" dataKey="usosAnual" stroke="#82ca9d" name="Usos Abono Anual" />
            <Line type="monotone" dataKey="usosOcasional" stroke="#ff7300" name="Usos Ocasional" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Bicicletas;
