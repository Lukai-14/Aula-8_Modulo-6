import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import './ModalProduto.css';

export function ModalProduto({ produto, onClose }) {
  if (!produto) return null;
  const { adicionarAoCarrinho } = useCarrinho();

  // Cálculo de conversão idêntico ao CardProduto
  const cotacao = 5.20;
  const temDesconto = produto.discountPercentage > 0;
  const precoOriginal = (produto.price || 0) * cotacao;
  const precoComDesconto = temDesconto
    ? precoOriginal * (1 - produto.discountPercentage / 100)
    : precoOriginal;

  // Busca a imagem em qualquer um dos formatos possíveis da API
  const imagemUrl =
    produto.thumbnail ||
    produto.image ||
    (Array.isArray(produto.images) ? produto.images[0] : '');

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="modal-fechar" onClick={onClose}>&times;</button>

        {imagemUrl && (
          <img
            src={imagemUrl}
            alt={produto.title}
            className="modal-imagem"
          />
        )}

        <div className="modal-detalhes">
          <span className="modal-categoria">{produto.category}</span>
          <h2>{produto.title}</h2>
          <p className="modal-descricao">{produto.description}</p>

          <div className="modal-precos">
            {temDesconto && (
              <span className="preco-antigo">{formatarMoeda(precoOriginal)}</span>
            )}
            <span className="preco-final">{formatarMoeda(precoComDesconto)}</span>
          </div>

          <button
            className="btn-adicionar"
            onClick={() => {
              adicionarAoCarrinho(produto);
              onClose();
            }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}