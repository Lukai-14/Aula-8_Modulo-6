import { useCarrinho } from '../context/CarrinhoContext';
import { Link } from 'react-router-dom';
import './Carrinho.css';

const COTACAO = 5.20;

export function Carrinho() {
  const { itens, alterarQuantidade, removerDoCarrinho } = useCarrinho();

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);

  const totalGeral = itens.reduce((soma, item) => {
    const precoReal = (item.price || 0) * COTACAO * (1 - (item.discountPercentage || 0) / 100);
    return soma + precoReal * (item.quantidade || 1);
  }, 0);

  if (!itens || itens.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>Seu carrinho está vazio 🛒</h2>
        <p style={{ margin: '16px 0', color: 'var(--cor-texto-secundario)' }}>
          Escolha alguns produtos na vitrine para começar.
        </p>
        <Link to="/" className="btn-voltar-vitrine">
          Ir para a vitrine
        </Link>
      </div>
    );
  }

  return (
    <div className="container carrinho-pagina">
      {/* Cabeçalho do Carrinho com o Botão Voltar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Seu carrinho</h2>
        <Link to="/" style={{ color: 'var(--cor-primaria)', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
          &larr; Continuar comprando
        </Link>
      </div>

      <div className="carrinho-conteudo">
        <div className="lista-itens">
          {itens.map((item) => {
            const precoUnitario = (item.price || 0) * COTACAO * (1 - (item.discountPercentage || 0) / 100);
            return (
              <div key={item.id} className="item-carrinho">
                <img src={item.thumbnail} alt={item.title} />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{formatarMoeda(precoUnitario)} cada</p>
                </div>

                <div className="item-controles">
                  <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                </div>

                <div className="item-subtotal">
                  {formatarMoeda(precoUnitario * (item.quantidade || 1))}
                </div>

                <button 
                  className="btn-remover" 
                  onClick={() => removerDoCarrinho(item.id)}
                  title="Remover produto"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </div>

        <div className="resumo-pedido">
          <h3>Resumo do pedido</h3>
          <div className="linha-resumo">
            <span>Total:</span>
            <strong>{formatarMoeda(totalGeral)}</strong>
          </div>
          <button className="btn-finalizar">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}