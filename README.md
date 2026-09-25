# 🛍️ Vitrine Alegre — E-Commerce em React

> **🔗 Links do Projeto:**
> - **Site Publicado (Vercel):** [https://aula-8-modulo-6.vercel.app/](https://aula-8-modulo-6.vercel.app/)
> - **Repositório GitHub:** [https://github.com/Lukai-14/Aula-8_Modulo-6](https://github.com/Lukai-14/Aula-8_Modulo-6)
---

## 🌟 Extensão Escolhida (Seção 4.3 do PDF)
- **Persistência do Carrinho via `localStorage`:** O carrinho de compras sincroniza automaticamente todas as adições, alterações de quantidade e remoções no `localStorage` do navegador, mantendo os itens mesmo após fechar ou recarregar a página.

---

## 🚀 Funcionalidades da Aplicação

- **Rotas Mapeadas:**
  - `/` — Vitrine de produtos com busca e categorias.
  - `/product/:id` e `/produtos/:id` — Detalhes do produto, avaliações, recomendados e compartilhamento.
  - `/carrinho` — Gerenciamento de itens, cálculo de subtotal e frete grátis.
- **4 Estados de Interface:** Carregando, Erro de API, Carrinho Vazio e Estado Inicial.
- **Responsividade Nativa:** Layout adaptado sem uso de bibliotecas de UI (CSS puro com Flexbox e CSS Grid).

---

## 🛠️ Tecnologias

- **React + Vite**
- **React Router Dom v6**
- **Context API (Estado Global)**
- **CSS3 Puro**
- **API Pública DummyJSON**

---

## 💻 Como Executar Localmente

```bash
# 1. Clonar o repositório
git clone [https://github.com/Lukai-14/Aula-8_Modulo-6.git](https://github.com/Lukai-14/Aula-8_Modulo-6.git)

# 2. Entrar na pasta
cd Aula-8_Modulo-6

# 3. Instalar dependências
npm install

# 4. Rodar o projeto
npm run dev