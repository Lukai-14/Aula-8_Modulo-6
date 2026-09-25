# 🛍️ Vitrine Alegre - E-Commerce em React

Aplicação de e-commerce responsiva desenvolvida em **React + Vite** como projeto acadêmico. O projeto consome a API publica DummyJSON e implementa navegação por rotas, gerenciamento de estado global com Context API e persistência no LocalStorage.

---

## 🚀 Funcionalidades Principais

- **Vitrine Dinâmica (`/`)**: Listagem de produtos por categoria e busca em tempo real.
- **Página de Detalhes do Produto (`/product/:id`)**:
  - Exibição de informações completas do produto.
  - Seção de **Produtos Recomendados** da mesma categoria.
  - Sistema de **Avaliações dos Clientes** (comentários da API + envio de novas avaliações funcionais).
- **Carrinho de Compras (`/carrinho`)**:
  - Controle de quantidade, remoção e cálculo automático de subtotal e total.
  - Persistência dos itens via `localStorage`.
- **Design Responsivo**: Adaptado para telas mobile, tablet e desktop.
- **Tratamento de Rota 404**: Redirecionamento amigável para URLs inexistentes.

---

## 🛠️ Tecnologias Utilizadas

- **React** (Hooks, Context API)
- **Vite** (Build tool)
- **React Router Dom v6** (Roteamento de páginas)
- **CSS3 / Flexbox / CSS Grid** (Estilização modular e responsiva)
- **DummyJSON API** (Fonte de dados de produtos e avaliações)
- **Vercel** (Hospedagem e CI/CD)

---

## 💻 Como Rodar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Lukai-14/Aula-8_Modulo-6.git](https://github.com/Lukai-14/Aula-8_Modulo-6.git)