import React, { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import './ModalProduto.css';

export function ModalProduto({ produto, todosProdutos = [], onClose }) {
  if (!produto) return null;
  const { itens, adicionarAoCarrinho } = useCarrinho();
  const [mensagem, setMensagem] = useState('');

  const itemNoCarrinho = itens?.find((item) => String(item.id) === String(produto.id));
  const quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;

  const cotacao = 5.20;
  const temDesconto = produto.discountPercentage > 0;
  const precoOriginal = (produto.price || 0) * cotacao;
  const precoComDesconto = temDesconto
    ? precoOriginal * (1 - produto.discountPercentage / 100)
    : precoOriginal;

  const imagemUrl =
    produto.thumbnail ||
    produto.image ||
    (Array.isArray(produto.images) ? produto.images[0] : '');

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  const handleAdicionar = (itemParaAdicionar = produto) => {
    adicionarAoCarrinho(itemParaAdicionar);
    setMensagem('Item adicionado!');
    setTimeout(() => setMensagem(''), 2000);
  };

  // Filtra 2 produtos da mesma categoria (excluindo o atual)
  const recomendados = todosProdutos
    .filter((item) => item.category === produto.category && String(item.id) !== String(produto.id))
    .slice(0, 2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="modal-fechar" onClick={onClose}>&times;</button>

        {mensagem && <div className="toast-aviso">{mensagem}</div>}

        {imagemUrl && (
          <img src={imagemUrl} alt={produto.title} className="modal-imagem" />
        )}

        <div className="modal-detalhes">
          <span className="modal-categoria">{produto.category}</span>
          <h2>{produto.title}</h2>
          
          {quantidadeNoCarrinho > 0 ? (
            <div className="alerta-carrinho-quantidade">
              <strong>✓ Produto no carrinho:</strong> {quantidadeNoCarrinho} {quantidadeNoCarrinho === 1 ? 'unidade selecionada' : 'unidades selecionadas'}.
            </div>
          ) : (
            <div className="alerta-carrinho-vazio">
              <span>Este produto ainda não foi adicionado ao seu carrinho.</span>
            </div>
          )}

          <p className="modal-descricao">{produto.description}</p>

          <div className="modal-precos">
            {temDesconto && (
              <span className="preco-antigo">{formatarMoeda(precoOriginal)}</span>
            )}
            <span className="preco-final">{formatarMoeda(precoComDesconto)}</span>
          </div>

          <button className="btn-adicionar" onClick={() => handleAdicionar(produto)}>
            {quantidadeNoCarrinho > 0 ? 'Adicionar (+1)' : 'Adicionar ao Carrinho'}
          </button>

          {/* Seção de Recomendados */}
          {recomendados.length > 0 && (
            <div className="secao-recomendados">
              <h4>Quem viu este item também gostou:</h4>
              <div className="grade-recomendados">
                {recomendados.map((rec) => (
                  <div key={rec.id} className="card-recomendado">
                    <img src={rec.thumbnail || rec.image} alt={rec.title} />
                    <div>
                      <p className="titulo-rec">{rec.title}</p>
                      <button onClick={() => handleAdicionar(rec)}>+ Adicionar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}