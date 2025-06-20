import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Acustica from './pages/Acustica';
import Bicicletas from './pages/Bicicletas';
import Accidentes from './pages/Accidentes';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acustica" element={<Acustica />} />
        <Route path="/bicicletas" element={<Bicicletas />} />
        <Route path="/accidentes" element={<Accidentes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
