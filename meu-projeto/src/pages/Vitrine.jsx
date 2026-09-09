import { useEffect, useState } from 'react';
import { CardProduto } from '../components/CardProduto';
import { FiltroCategorias } from '../components/FiltroCategorias';
import { ModalProduto } from '../components/ModalProduto';
import { listarProdutos, listarCategorias } from '../services/api';

export function Vitrine({ busca }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    listarCategorias()
      .then((dados) => setCategorias(dados))
      .catch((err) => console.error('Erro ao buscar categorias:', err));
  }, []);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    listarProdutos(categoriaAtiva, busca)
      .then((dados) => setProdutos(dados))
      .catch(() => setErro('Não foi possível carregar os produtos.'))
      .finally(() => setCarregando(false));
  }, [categoriaAtiva, busca]);

  return (
    <div className="container">
      <FiltroCategorias
        categorias={categorias}
        categoriaAtiva={categoriaAtiva}
        setCategoriaAtiva={setCategoriaAtiva}
      />

      {carregando && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2>Carregando produtos...</h2>
        </div>
      )}

      {!carregando && erro && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--cor-alerta)' }}>
          <h2>!</h2>
          <h3>{erro}</h3>
        </div>
      )}

      {!carregando && !erro && produtos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h3>Nenhum produto encontrado.</h3>
        </div>
      )}

      {!carregando && !erro && produtos.length > 0 && (
        <div className="grade-produtos">
          {produtos.map((item) => (
            <CardProduto 
              key={item.id} 
              produto={item} 
              onVerDetalhes={(p) => setProdutoSelecionado(p)} 
            />
          ))}
        </div>
      )}

<ModalProduto 
  produto={produtoSelecionado} 
  todosProdutos={produtos}
  onClose={() => setProdutoSelecionado(null)} 
/>
    </div>
  );
}