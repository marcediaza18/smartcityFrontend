import axios from 'axios';

const enviarDatos = (tipo, frecuencia) => {
  setInterval(() => {
    const datosSimulados = {
      // Dependiendo del tipo de datos puedes añadir diferentes datos
      accidente: { /* Simulaciones */ },
      bicicletas: { /* Simulaciones */ },
      // Otros tipos de datos
    };

    axios.post(`http://localhost:4000/api/${tipo}`, datosSimulados)
      .then(response => console.log(`Datos enviados: ${response.data}`))
      .catch(error => console.error('Error enviando datos:', error));
  }, frecuencia);
};

export default enviarDatos;
