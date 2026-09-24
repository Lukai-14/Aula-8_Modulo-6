import { useEffect, useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { Link } from 'react-router-dom';
import { listarProdutos } from '../services/api';
import './Carrinho.css';

const COTACAO = 5.20;

export function Carrinho() {
  const { itens, alterarQuantidade, removerDoCarrinho, adicionarAoCarrinho } = useCarrinho();
  const [sugestoes, setSugestoes] = useState([]);

  useEffect(() => {
    listarProdutos('Todas')
      .then((dados) => {
        const idsNoCarrinho = (itens || []).map((i) => String(i.id));
        const disponiveis = dados.filter((p) => !idsNoCarrinho.includes(String(p.id)));
        setSugestoes(disponiveis.slice(0, 3));
      })
      .catch(() => {});
  }, [itens]);

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);

  const totalGeral = itens.reduce((soma, item) => {
    const precoReal = (item.price || 0) * COTACAO * (1 - (item.discountPercentage || 0) / 100);
    return soma + precoReal * (item.quantidade || 1);
  }, 0);

  if (!itens || itens.length === 0) {
    return (
      <div className="container carrinho-vazio-container">
        <div className="carrinho-vazio-card">
          <div className="icone-carrinho-vazio">🛒</div>
          <h2>Seu carrinho está vazio</h2>
          <p>Você ainda não adicionou nenhum item. Explore nossa vitrine e aproveite as ofertas!</p>
          <Link to="/" className="btn-voltar-vitrine">
            Ir para a Vitrine
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container carrinho-pagina">
      {/* Cabeçalho */}
      <div className="carrinho-cabecalho">
        <div>
          <h2>Seu Carrinho</h2>
          <span className="carrinho-contador-itens">
            {itens.length} {itens.length === 1 ? 'produto selecionado' : 'produtos selecionados'}
          </span>
        </div>
        <Link to="/" className="btn-continuar-comprando">
          &larr; Continuar Comprando
        </Link>
      </div>

      {/* Grid Principal de 2 Colunas */}
      <div className="carrinho-grid">
        {/* Coluna Esquerda: Itens + Recomendações */}
        <div className="carrinho-coluna-principal">
          <div className="lista-itens-carrinho">
            {itens.map((item) => {
              const precoUnitario = (item.price || 0) * COTACAO * (1 - (item.discountPercentage || 0) / 100);
              const subtotalItem = precoUnitario * (item.quantidade || 1);

              return (
                <div key={item.id} className="card-item-carrinho">
                  <div className="item-imagem-container">
                    <img src={item.thumbnail || item.image} alt={item.title} />
                  </div>

                  <div className="item-detalhes">
                    <span className="item-categoria">{item.category}</span>
                    <h4 className="item-titulo">{item.title}</h4>
                    <p className="item-preco-unitario">{formatarMoeda(precoUnitario)} cada</p>
                  </div>

                  <div className="item-acoes">
                    <div className="item-controles-qtd">
                      <button 
                        onClick={() => alterarQuantidade(item.id, -1)}
                        title="Diminuir quantidade"
                      >
                        -
                      </button>
                      <span>{item.quantidade}</span>
                      <button 
                        onClick={() => alterarQuantidade(item.id, 1)}
                        title="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>

                    <div className="item-subtotal-container">
                      <span className="subtotal-rotulo">Subtotal</span>
                      <span className="subtotal-valor">{formatarMoeda(subtotalItem)}</span>
                    </div>

                    <button 
                      className="btn-remover-item" 
                      onClick={() => removerDoCarrinho(item.id)}
                      title="Remover produto do carrinho"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recomendados no Carrinho */}
          {sugestoes.length > 0 && (
            <div className="secao-sugestoes">
              <h3>Aproveite e leve também 💡</h3>
              <div className="grid-sugestoes">
                {sugestoes.map((prod) => {
                  const precoReal = (prod.price || 0) * COTACAO * (1 - (prod.discountPercentage || 0) / 100);
                  return (
                    <div key={prod.id} className="card-sugestao">
                      <img src={prod.thumbnail || prod.image} alt={prod.title} />
                      <div className="sugestao-info">
                        <h4>{prod.title}</h4>
                        <span className="sugestao-preco">{formatarMoeda(precoReal)}</span>
                      </div>
                      <button 
                        onClick={() => adicionarAoCarrinho(prod)}
                        className="btn-adicionar-sugestao"
                      >
                        + Adicionar
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita: Resumo do Pedido */}
        <div className="carrinho-coluna-resumo">
          <div className="card-resumo-pedido">
            <h3>Resumo do Pedido</h3>
            
            <div className="linha-resumo">
              <span>Subtotal dos produtos:</span>
              <span>{formatarMoeda(totalGeral)}</span>
            </div>

            <div className="linha-resumo frete-gratis">
              <span>Frete:</span>
              <span className="tag-frete">GRÁTIS</span>
            </div>

            <div className="divisor-resumo"></div>

            <div className="linha-resumo total-destaque">
              <span>Total:</span>
              <strong>{formatarMoeda(totalGeral)}</strong>
            </div>

            <button className="btn-finalizar-compra">
              Finalizar Compra
            </button>

            <p className="garantia-compra">
              🔒 Compra 100% Segura e Garantida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}