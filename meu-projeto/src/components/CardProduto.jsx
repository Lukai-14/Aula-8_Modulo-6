import { useCarrinho } from '../context/CarrinhoContext';
import './CardProduto.css';

export function CardProduto({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();
  
  // Cálculo da conversão (Dólar para Real) igual ao seu carrinho
  const cotacao = 5.20;
  const precoOriginal = (produto.price || 0) * cotacao;
  const precoComDesconto = precoOriginal * (1 - (produto.discountPercentage || 0) / 100);

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div className="card-produto">
      {produto.discountPercentage > 0 && (
        <span className="selo-desconto">-{produto.discountPercentage}%</span>
      )}
      <img src={produto.thumbnail} alt={produto.title} className="card-imagem" />
      <span className="card-categoria">{produto.category}</span>
      <h3 className="card-titulo">{produto.title}</h3>
      
      <div className="card-precos">
        <span className="preco-antigo">{formatarMoeda(precoOriginal)}</span>
        <span className="preco-final">{formatarMoeda(precoComDesconto)}</span>
      </div>
      
      <button 
        className="btn-adicionar" 
        onClick={() => adicionarAoCarrinho(produto)}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}