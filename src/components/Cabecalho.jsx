import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import './Cabecalho.css';

export function Cabecalho({ busca, setBusca }) {
  const navigate = useNavigate();
  const { itens } = useCarrinho();

  const quantidadeTotal = itens ? itens.reduce((acc, item) => acc + item.quantidade, 0) : 0;

  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <Link to="/" className="logo">
          <span className="logo-icone">VA</span>
          <h1>Vitrine <span>Alegre</span></h1>
        </Link>

        <div className="busca-container">
          <input
            type="text"
            className="campo-busca"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="acoes-cabecalho">
          <button 
            className="btn-carrinho-icone" 
            onClick={() => navigate('/carrinho')}
            title="Ver Carrinho"
            aria-label="Ver Carrinho"
          >
            🛒
            {quantidadeTotal > 0 && (
              <span className="badge-contador">{quantidadeTotal}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}