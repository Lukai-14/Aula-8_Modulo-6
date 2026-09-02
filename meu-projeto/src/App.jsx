import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cabecalho } from './components/Cabecalho';
import { Vitrine } from './pages/Vitrine';
import { Carrinho } from './pages/Carrinho';
import { NaoEncontrada } from './pages/NaoEncontrada';

export default function App() {
  const [busca, setBusca] = useState('');

  return (
    <BrowserRouter>
      <Cabecalho busca={busca} setBusca={setBusca} />
      <Routes>
        <Route path="/" element={<Vitrine busca={busca} />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}