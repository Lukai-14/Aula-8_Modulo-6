import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import './CardProduto.css';

export function CardProduto({ produto }) {
  const navigate = useNavigate();
  const { itens } = useCarrinho();

  const itemNoCarrinho = itens?.find((item) => String(item.id) === String(produto.id));
  const quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;

  const cotacao = 5.20;
  const precoOriginal = (produto.price || 0) * cotacao;
  const precoComDesconto = produto.discountPercentage > 0 
    ? precoOriginal * (1 - produto.discountPercentage / 100) 
    : precoOriginal;

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  const handleVerDetalhes = () => {
    if (produto?.id) {
      navigate(`/product/${produto.id}`);
    }
  };

  return (
    <div 
      className={`card-produto ${quantidadeNoCarrinho > 0 ? 'card-selecionado' : ''}`}
      onClick={handleVerDetalhes}
      style={{ cursor: 'pointer' }}
    >
      {quantidadeNoCarrinho > 0 && (
        <div className="badge-quantidade-carrinho">
          🛒 {quantidadeNoCarrinho} no carrinho
        </div>
      )}

      {produto.discountPercentage > 0 && (
        <span className="selo-desconto">-{produto.discountPercentage}%</span>
      )}

      <img 
        src={produto.thumbnail || produto.image} 
        alt={produto.title} 
        className="card-imagem" 
      />
      
      <span className="card-categoria">{produto.category}</span>
      
      <h3 className="card-titulo">
        {produto.title}
      </h3>
      
      <div className="card-precos">
        {produto.discountPercentage > 0 && (
          <span className="preco-antigo">{formatarMoeda(precoOriginal)}</span>
        )}
        <span className="preco-final">{formatarMoeda(precoComDesconto)}</span>
      </div>

      <button className="btn-ver-detalhes">
        Ver Detalhes →
      </button>
    </div>
  );
}