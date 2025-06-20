import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icono personalizado
const iconoTrafico = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25]
});

const Trafico = () => {
  const [datos, setDatos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [distritoSeleccionado, setDistritoSeleccionado] = useState('');
  const [mostrarMapa, setMostrarMapa] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/trafico')
      .then((res) => {
        const datosValidos = res.data.filter(p => p.latitud && p.longitud);
        setDatos(datosValidos);

        const tiposUnicos = [...new Set(datosValidos.map(p => p.tipo))].sort();
        const distritosUnicos = [...new Set(datosValidos.map(p => p.distrito))].sort();

        setTipos(tiposUnicos);
        setDistritos(distritosUnicos);
      })
      .catch((err) => console.error('Error al obtener datos de tráfico:', err));
  }, []);

  const datosFiltrados = datos.filter(p =>
    (!tipoSeleccionado || p.tipo === tipoSeleccionado) &&
    (!distritoSeleccionado || p.distrito === distritoSeleccionado)
  );

  const Leyenda = () => {
    const map = useMap();
    useEffect(() => {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `
        <h4>Leyenda</h4>
        <p><img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width="20" /> Punto de tráfico</p>
      `;
      const control = L.control({ position: 'bottomright' });
      control.onAdd = () => div;
      control.addTo(map);
      return () => control.remove();
    }, [map]);
    return null;
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Mapa de Puntos de Tráfico</h2>

      <div style={{ marginBottom: '1rem', background: '#eef5f8', padding: '15px', borderRadius: '8px' }}>
        <p>
          Esta sección muestra los <strong>puntos de medición de tráfico</strong> distribuidos por la ciudad.
          Cada marcador representa una ubicación donde se recogen datos como intensidad o velocidad media de vehículos.
        </p>
        <p>
          Puedes filtrar por <strong>tipo de punto</strong> y <strong>distrito</strong> para reducir la cantidad de datos
          y centrarte en zonas concretas. Una vez seleccionados los filtros, pulsa <em>“Mostrar mapa”</em>.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label>Tipo de punto:</label><br />
          <select value={tipoSeleccionado} onChange={(e) => { setTipoSeleccionado(e.target.value); setMostrarMapa(false); }}>
            <option value="">Todos</option>
            {tipos.map((tipo, idx) => (
              <option key={idx} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Distrito:</label><br />
          <select value={distritoSeleccionado} onChange={(e) => { setDistritoSeleccionado(e.target.value); setMostrarMapa(false); }}>
            <option value="">Todos</option>
            {distritos.map((distrito, idx) => (
              <option key={idx} value={distrito}>{distrito}</option>
            ))}
          </select>
        </div>

        {(tipoSeleccionado || distritoSeleccionado) && !mostrarMapa && (
          <div>
            <button onClick={() => setMostrarMapa(true)}>
              Mostrar mapa ({datosFiltrados.length} puntos)
            </button>
          </div>
        )}
      </div>

      {mostrarMapa && (
        <MapContainer
          center={[40.4168, -3.7038]}
          zoom={12}
          scrollWheelZoom={true}
          className="leaflet-container"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {datosFiltrados.map(punto => (
            <Marker
              key={punto._id}
              position={[punto.latitud, punto.longitud]}
              icon={iconoTrafico}
            >
              <Popup>
                <strong>{punto.nombre}</strong><br />
                Tipo: {punto.tipo}<br />
                Distrito: {punto.distrito}
              </Popup>
            </Marker>
          ))}

          <Leyenda />
        </MapContainer>
      )}
    </motion.div>
  );
};

export default Trafico;
