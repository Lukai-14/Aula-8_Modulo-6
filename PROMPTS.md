---

### 2. Crie o arquivo `PROMPTS.md`
Copie e cole este código dentro dele:

```markdown
# Registro de Prompts e Interações com a IA

Este documento registra o histórico de comandos, dúvidas e solicitações enviadas à Inteligência Artificial durante a conclusão e refinamento do projeto **Vitrine Alegre**.

## 📝 Histórico de Comandos / Prompts

1. **Ajuste de Layout Mobile:**
   - *Prompt:* "A barra de pesquisa está cobrindo as categorias no celular."
   - *Solução recebida:* Ajuste nas regras de CSS do cabeçalho alterando `height: 76px` para `height: auto` e permitindo `flex-wrap`.

2. **Correção de Erro de Import/Export (Tela Branca):**
   - *Prompt:* "Uncaught SyntaxError: The requested module '/src/components/CardProduto.jsx' does not provide an export named 'CardProduto'"
   - *Solução recebida:* Padronização do componente `CardProduto.jsx` com exportação nomeada `export function CardProduto` e reconstrução correta dos cartões.

3. **Navegação do Carrinho:**
   - *Prompt:* "vamos adicionar o botão de voltar do carrinho"
   - *Solução recebida:* Implementação do link `&larr; Continuar comprando` apontando para `/` no topo da página `Carrinho.jsx`.

4. **Redirecionamento da Busca:**
   - *Prompt:* Solicitada lógica para redirecionar o usuário da tela de carrinho para a vitrine ao digitar no campo de busca.
   - *Solução recebida:* Atualização na função `handleBuscaChange` em `Cabecalho.jsx` utilizando os hooks `useNavigate` e `useLocation` do React Router.

5. **Tratamento de Rota 404:**
   - *Prompt:* Criação de uma página amigável para rotas inexistentes.
   - *Solução recebida:* Componente `NaoEncontrada.jsx` e adição do `Route path="*"` no `App.jsx`.