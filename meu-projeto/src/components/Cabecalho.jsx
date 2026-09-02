import './Cabecalho.css';
import { useCarrinho } from '../context/CarrinhoContext';
import { Link } from 'react-router-dom';

export function Cabecalho({ busca, setBusca }) {
  const { totalItens } = useCarrinho();

  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span className="logo-icone">V</span>
          <h1>Vitrine <span>Alegre</span></h1>
        </Link>

        <div className="busca-container">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="campo-busca"
            value={busca || ''}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="acoes-cabecalho">
          <button className="btn-entrar">Entrar</button>
          <Link to="/carrinho" className="btn-carrinho" style={{ textDecoration: 'none' }}>
            🛒 Carrinho
            {totalItens > 0 && (
              <span className="contador-carrinho">{totalItens}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}