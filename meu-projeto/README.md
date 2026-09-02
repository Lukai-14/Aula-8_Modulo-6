# Vitrine Alegre 🛒

Projeto de e-commerce desenvolvido em React para a disciplina de Desenvolvimento Front End II. A aplicação permite visualizar produtos, filtrar por categorias, pesquisar itens em tempo real, gerenciar um carrinho de compras com conversão de moedas e navegar entre páginas de forma dinâmica.

## 🚀 Tecnologias Utilizadas

- **React** (Vite)
- **React Router DOM** (Navegação SPA e Rota 404)
- **Context API** (Gerenciamento global do estado do carrinho)
- **CSS Grid e Flexbox** (Layouts modernos e responsivos)
- **Git** (Controle de versão)

## 📌 Funcionalidades

- **Vitrine de Produtos:** Listagem dinâmica consumindo dados de API externa.
- **Filtros e Busca:** Busca instantânea por nome e filtro por categorias.
- **Redirecionamento Inteligente:** A busca realizada no carrinho redireciona automaticamente para a Vitrine.
- **Carrinho de Compras:** Adição, remoção, alteração de quantidade e cálculo de total em BRL (com cotação e desconto aplicados).
- **Navegação:** Botão "Continuar comprando" no carrinho e tratamento para URLs inexistentes (Página 404).
- **Layout Responsivo:** Adaptação completa para telas mobile e desktop.
- **Tratamento de Erros:** Exibição de telas amigáveis para estados de carregamento, lista vazia e erro de rede.

## 💻 Como Rodar o Projeto

1. Clone o repositório ou baixe o código-fonte.
2. No terminal, instale as dependências:
   ```bash
   npm install