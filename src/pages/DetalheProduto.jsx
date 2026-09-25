import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import './DetalheProduto.css';

export function DetalheProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { itens, adicionarAoCarrinho, removerDoCarrinho } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro(null);

        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error('Produto não encontrado');
        const data = await res.json();
        
        setProduto(data);
        setAvaliacoes(data.reviews || []);

        if (data.category) {
          const resRec = await fetch(`https://dummyjson.com/products/category/${data.category}`);
          if (resRec.ok) {
            const dataRec = await resRec.json();
            const filtrados = (dataRec.products || [])
              .filter((item) => String(item.id) !== String(id))
              .slice(0, 4);
            setRecomendados(filtrados);
          }
        }
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarDados();
  }, [id]);

  if (carregando) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Carregando detalhes do produto...</h2>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Ops! Produto não encontrado.</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>{erro}</p>
        <button onClick={() => navigate('/')} className="btn-voltar">
          ← Voltar para a Vitrine
        </button>
      </div>
    );
  }

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

  const renderizarEstrelas = (num) => '★'.repeat(num) + '☆'.repeat(5 - num);

  const handleAdicionar = (itemAdicionar = produto) => {
    adicionarAoCarrinho(itemAdicionar);
    setMensagem('Item adicionado ao carrinho!');
    setTimeout(() => setMensagem(''), 2000);
  };

  const handleComprarAgora = () => {
    adicionarAoCarrinho(produto);
    navigate('/carrinho');
  };

  const handleRemover = () => {
    if (removerDoCarrinho) {
      removerDoCarrinho(produto.id);
    }
    setMensagem('Item removido do carrinho!');
    setTimeout(() => setMensagem(''), 2000);
  };

  const handleCopiarLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setMensagem('Link do produto copiado!');
    setTimeout(() => setMensagem(''), 2500);
  };

  const handleCompartilharWhatsApp = () => {
    const texto = encodeURIComponent(`Olha esse produto na Vitrine Alegre: ${produto.title}`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${texto}%20${url}`, '_blank');
  };

  const handleNovaAvaliacao = (e) => {
    e.preventDefault();
    if (!comentario.trim()) return;

    const novaAvaliacao = {
      reviewerName: nomeUsuario.trim() || 'Usuário Anônimo',
      rating: Number(nota),
      comment: comentario,
      date: new Date().toISOString()
    };

    setAvaliacoes([novaAvaliacao, ...avaliacoes]);
    setComentario('');
    setNomeUsuario('');
    setNota(5);
    setMensagem('Sua avaliação foi enviada com sucesso!');
    setTimeout(() => setMensagem(''), 2500);
  };

  return (
    <div className="detalhe-container">
      <button onClick={() => navigate('/')} className="btn-voltar">
        ← Voltar para a Vitrine
      </button>

      {mensagem && <div className="toast-notificacao">{mensagem}</div>}

      <div className="card-detalhe-principal">
        <div>
          {imagemUrl && (
            <img src={imagemUrl} alt={produto.title} className="imagem-detalhe-produto" />
          )}
        </div>

        <div className="coluna-info-detalhe">
          <span className="categoria-tag">{produto.category}</span>
          <h1 className="titulo-detalhe-produto">{produto.title}</h1>

          {quantidadeNoCarrinho > 0 ? (
            <div className="alerta-status-carrinho no-carrinho">
              <strong>✓ Produto no carrinho:</strong> {quantidadeNoCarrinho} {quantidadeNoCarrinho === 1 ? 'unidade' : 'unidades'}.
            </div>
          ) : (
            <div className="alerta-status-carrinho fora-carrinho">
              Este produto ainda não foi adicionado ao seu carrinho.
            </div>
          )}

          <p className="descricao-detalhe">{produto.description}</p>

          <div className="container-precos-detalhe">
            {temDesconto && (
              <span className="preco-antigo-detalhe">{formatarMoeda(precoOriginal)}</span>
            )}
            <span className="preco-final-detalhe">{formatarMoeda(precoComDesconto)}</span>
          </div>

          {/* Grupo de Ações Principais */}
          <div className="grupo-acoes-detalhes">
            <button onClick={handleComprarAgora} className="btn-comprar-agora">
              ⚡ Comprar Agora
            </button>

            <button onClick={() => handleAdicionar(produto)} className="btn-adicionar-detalhe">
              {quantidadeNoCarrinho > 0 ? 'Adicionar (+1)' : 'Adicionar ao Carrinho'}
            </button>

            {quantidadeNoCarrinho > 0 && (
              <button onClick={handleRemover} className="btn-remover-detalhe">
                🗑️ Remover do Carrinho
              </button>
            )}
          </div>

          {/* Opções de Compartilhamento */}
          <div className="secao-compartilhar">
            <span>Compartilhar:</span>
            <button onClick={handleCompartilharWhatsApp} className="btn-social btn-whatsapp" title="Compartilhar no WhatsApp">
              📲 WhatsApp
            </button>
            <button onClick={handleCopiarLink} className="btn-social btn-copiar-link" title="Copiar Link">
              🔗 Copiar Link
            </button>
          </div>
        </div>
      </div>

      {recomendados.length > 0 && (
        <div className="secao-recomendados-detalhe">
          <h3>Quem viu este item também gostou:</h3>
          <div className="grade-recomendados-detalhe">
            {recomendados.map((rec) => (
              <div 
                key={rec.id} 
                className="card-item-recomendado"
                onClick={() => navigate(`/product/${rec.id}`)}
              >
                <img src={rec.thumbnail || rec.image} alt={rec.title} className="imagem-item-recomendado" />
                <h4 style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>{rec.title}</h4>
                <p style={{ fontWeight: 'bold', color: '#2e7d32', margin: '0.3rem 0' }}>
                  {formatarMoeda((rec.price || 0) * cotacao)}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${rec.id}`);
                  }}
                  className="btn-add-rec"
                >
                  Ver Item
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="secao-avaliacoes-detalhe">
        <h3>Avaliações dos Clientes ({avaliacoes.length})</h3>

        <form onSubmit={handleNovaAvaliacao} className="form-nova-avaliacao">
          <h4 style={{ margin: '0 0 0.8rem 0', color: '#444' }}>Deixe sua avaliação sobre este produto:</h4>
          
          <div className="grid-inputs-avaliacao">
            <input 
              type="text" 
              placeholder="Seu nome (opcional)" 
              value={nomeUsuario} 
              onChange={(e) => setNomeUsuario(e.target.value)}
              className="input-padrao"
            />
            <select 
              value={nota} 
              onChange={(e) => setNota(e.target.value)}
              className="input-padrao"
            >
              <option value="5">5 estrelas ★★★★★</option>
              <option value="4">4 estrelas ★★★★☆</option>
              <option value="3">3 estrelas ★★★☆☆</option>
              <option value="2">2 estrelas ★★☆☆☆</option>
              <option value="1">1 estrela ★☆☆☆☆</option>
            </select>
          </div>

          <textarea 
            placeholder="O que você achou do produto?" 
            value={comentario} 
            onChange={(e) => setComentario(e.target.value)}
            rows="3"
            required
            className="textarea-padrao"
          />

          <button type="submit" className="btn-enviar-avaliacao">
            Enviar Avaliação
          </button>
        </form>

        <div>
          {avaliacoes.length === 0 ? (
            <p style={{ color: '#666' }}>Este produto ainda não possui avaliações. Seja o primeiro a avaliar!</p>
          ) : (
            avaliacoes.map((item, index) => (
              <div key={index} className="item-avaliacao">
                <div className="header-item-avaliacao">
                  <strong style={{ color: '#333' }}>{item.reviewerName || 'Cliente'}</strong>
                  <span className="estrelas-rating">{renderizarEstrelas(item.rating)}</span>
                </div>
                <p style={{ margin: '0 0 0.3rem 0', color: '#555', fontSize: '0.95rem' }}>{item.comment}</p>
                {item.date && (
                  <span style={{ fontSize: '0.75rem', color: '#999' }}>
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}