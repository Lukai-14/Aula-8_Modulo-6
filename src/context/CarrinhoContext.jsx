import { createContext, useContext, useState, useEffect } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const itensSalvos = localStorage.getItem('vitrine_alegre_carrinho');
      return itensSalvos ? JSON.parse(itensSalvos) : [];
    } catch (erro) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vitrine_alegre_carrinho', JSON.stringify(itens));
    } catch (erro) {
      console.error('Erro ao salvar:', erro);
    }
  }, [itens]);

  function adicionarAoCarrinho(produto) {
    setItens((itensAtuais) => {
      const itemExiste = itensAtuais.find((item) => item.id === produto.id);
      if (itemExiste) {
        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id, delta) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) => {
        if (item.id === id) {
          const novaQtd = item.quantidade + delta;
          return novaQtd > 0 ? { ...item, quantidade: novaQtd } : item;
        }
        return item;
      })
    );
  }

  function removerDoCarrinho(id) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }

  const totalItens = itens.reduce((soma, item) => soma + (item.quantidade || 0), 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        alterarQuantidade,
        removerDoCarrinho,
        totalItens,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}