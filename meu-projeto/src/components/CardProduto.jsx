import { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import './CardProduto.css';

export function CardProduto({ produto, onVerDetalhes }) {
  const { itens, adicionarAoCarrinho } = useCarrinho();
  const [mensagem, setMensagem] = useState('');

  // Busca na lista 'itens' exportada pelo CarrinhoContext
  const itemNoCarrinho = itens?.find((item) => String(item.id) === String(produto.id));
  const quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;

  const cotacao = 5.20;
  const precoOriginal = (produto.price || 0) * cotacao;
  const precoComDesconto = produto.discountPercentage > 0 
    ? precoOriginal * (1 - produto.discountPercentage / 100) 
    : precoOriginal;

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  const handleAdicionar = (e) => {
    e.stopPropagation();
    adicionarAoCarrinho(produto);
    
    setMensagem('Item adicionado!');
    setTimeout(() => setMensagem(''), 2000);
  };

  return (
    <div className={`card-produto ${quantidadeNoCarrinho > 0 ? 'card-selecionado' : ''}`}>
      {mensagem && <div className="toast-aviso">{mensagem}</div>}

      {quantidadeNoCarrinho > 0 && (
        <div className="badge-quantidade-carrinho">
          🛒 {quantidadeNoCarrinho} {quantidadeNoCarrinho === 1 ? 'unidade no carrinho' : 'unidades no carrinho'}
        </div>
      )}

      {produto.discountPercentage > 0 && (
        <span className="selo-desconto">-{produto.discountPercentage}%</span>
      )}

      <img 
        src={produto.thumbnail || produto.image} 
        alt={produto.title} 
        className="card-imagem" 
        onClick={() => onVerDetalhes && onVerDetalhes(produto)}
        style={{ cursor: 'pointer' }}
      />
      
      <span className="card-categoria">{produto.category}</span>
      
      <h3 
        className="card-titulo" 
        onClick={() => onVerDetalhes && onVerDetalhes(produto)}
        style={{ cursor: 'pointer' }}
      >
        {produto.title}
      </h3>
      
      <div className="card-precos">
        {produto.discountPercentage > 0 && (
          <span className="preco-antigo">{formatarMoeda(precoOriginal)}</span>
        )}
        <span className="preco-final">{formatarMoeda(precoComDesconto)}</span>
      </div>
      
      <button 
  className="btn-adicionar"
  onClick={handleAdicionar}
>
  {quantidadeNoCarrinho > 0 ? 'Adicionar (+1)' : 'Adicionar ao Carrinho'}
</button>
    </div>
  );
}