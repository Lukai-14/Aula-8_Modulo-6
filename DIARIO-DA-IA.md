# Diário de Uso da IA no Desenvolvimento

## Objetivo
Relatar as decisões técnicas, a resolução de problemas e o aprendizado obtido através da colaboração com o assistente de IA na construção do projeto **Vitrine Alegre**.

## Principais Decisões de Arquitetura
1. **Centralização do Estado com Context API:** Para evitar o compartilhamento manual de propriedades entre múltiplos níveis de componentes, o `CarrinhoContext` foi mantido para gerenciar os produtos selecionados, persistência no `localStorage` e cálculo do total.
2. **Arquitetura de Rotas Dinâmicas (`react-router-dom`):** Substituição do fluxo baseado em Modais por rotas dedicadas (`/product/:id`), garantindo URLs legíveis, navegação via histórico do navegador e melhor separação de responsabilidades.
3. **Valorização do Fluxo de Detalhes:** Remoção da ação direta de adicionar ao carrinho na vitrine, convertendo os cards em pontos de entrada para a página `/product/:id`, onde o usuário pode ler avaliações, ver recomendados e escolher suas ações.
4. **Tratamento de Erros e Feedback Visual:** Implementação de tratamento defensivo de erros ao consumir a API externa, exibindo avisos amigáveis em vez de quebrar a interface do usuário.
5. **Controle de Versão Seguro (Git):** O uso de commits frequentes (`git add .` e `git commit`) foi adotado como boa prática para garantir pontos de restauração estáveis antes de realizar alterações complexas no código.

## Desafios Resolvidos
- **Sobreposição no Mobile:** Ajuste de dimensões no cabeçalho e estilização responsiva para garantir acessibilidade em telas pequenas.
- **Roteamento Dinâmico:** Implementação de regras de navegação no `Cabecalho` permitindo que a pesquisa de produtos funcione de qualquer página da aplicação.
- **Compactação e Otimização Visual:** Refatoração de CSS para travar o tamanho desproporcional de imagens e organizar os cards em 2 colunas no mobile.
- **Recursos Avançados de E-Commerce:** Integração de botões para compra rápida ("Comprar Agora"), remoção de itens na tela de detalhes e compartilhamento nativo para WhatsApp e área de transferência.

---

# Registros Históricos e Evolução do Projeto

## Registros Anteriores (Semana de 17/09 a 24/09)

### Registro 1: Erro 404 (NOT_FOUND) ao recarregar a página na Vercel
* **Problema:** Ao navegar para rotas como `/carrinho` ou `/produto/:id` e recarregar a página (F5) na Vercel, o servidor retornava erro `404: NOT_FOUND`.
* **Causa:** Por se tratar de uma Single Page Application (SPA) construída com React Router, a Vercel tentava buscar um arquivo físico no caminho da URL que não existia no servidor.
* **Solução:** Criação do arquivo `vercel.json` na raiz do projeto com a regra de reescrita (*rewrites*) redirecionando todas as requisições `/(.*)` para o `/index.html`.

### Registro 2: Estrutura de pastas aninhadas no repositório Git
* **Problema:** O código do React e os arquivos de documentação estavam divididos dentro de uma subpasta (`meu-projeto`) dentro da pasta principal (`Aula-8_Modulo 6`).
* **Causa:** O repositório Git foi inicializado na pasta pai em vez da pasta raiz do projeto React.
* **Solução:** Moveram-se todos os arquivos do React (`src/`, `public/`, `package.json`, etc.) diretamente para a raiz do repositório, garantindo conformidade com a estrutura exigida pelo professor.

### Registro 3: Apontamento incorreto do *Root Directory* na Vercel
* **Problema:** A Vercel falhava na compilação ou não encontrava os scripts do `package.json` após a reorganização das pastas.
* **Causa:** O painel da Vercel estava configurado para buscar o build dentro do diretório `/meu-projeto`, que havia sido eliminado.
* **Solução:** Acesso às configurações do projeto na Vercel (`Settings -> Build and Deployment`) e limpeza do campo **Root Directory** para apontar diretamente para a raiz.

### Registro 4: Duplicidade de arquivos de documentação e artefatos de backup
* **Problema:** Existiam arquivos `.md` e backups zipados espalhados tanto na raiz quanto dentro de subpastas do projeto.
* **Causa:** Acúmulo de arquivos gerados em etapas anteriores da aula.
* **Solução:** Comparação das versões mais atualizadas do `README.md`, `PROMPTS.md` e `DIARIO-DA-IA.md`, consolidação dos dados na raiz e remoção dos arquivos duplicados e backups `.zip`.

### Registro 5: Erro de *Staged Changes* no Git ao realizar o Commit pelo VS Code
* **Problema:** Ao tentar fazer o commit após mover os arquivos de pasta, o VS Code exibia a mensagem *"There are no staged changes to commit"*.
* **Causa:** As alterações e exclusões massivas de arquivos precisavam ser adicionadas ao estágio de preparação (*stage*) do Git.
* **Solução:** Confirmação do diálogo do VS Code para incluir automaticamente todas as alterações no *stage* (`git add .`) antes da execução do `git commit` e `git push`.

---

## Registros Atuais (Refinamento Final & UX)

### Registro 6: Migração do Modal de Detalhes para Rota Dedicada (`/product/:id`)
* **Problema:** O visualização de produto via Modal limitava a experiência do usuário, impedindo o compartilhamento de links diretos de produtos e poluindo o estado da página principal.
* **Causa:** O projeto dependia de um estado local `produtoSelecionado` que abria uma janela sobreposta.
* **Solução:** Criação da página `DetalheProduto.jsx` com o hook `useParams` para extrair o `id` da URL e realizar requisições diretas à API. Separação dos estilos em `DetalheProduto.css`.

### Registro 7: Sistema Interativo de Avaliações e Recomendados
* **Problema:** A página do produto precisava oferecer maior nível de detalhes, engajamento e recursos comuns em plataformas profissionais de e-commerce.
* **Causa:** Ausência de seções de feedback social e de cross-selling.
* **Solução:** Leitura da propriedade `reviews` da DummyJSON para exibir avaliações reais e criação de formulário no estado local para inserção de novos comentários na hora. Adição de requisição secundária por categoria para renderizar produtos recomendados.

### Registro 8: Otimização de Layout, Cards Compactos e Cabeçalho
* **Problema:** As imagens dos cards estavam ocupando espaço excessivo na tela, e a palavra "Carrinho" poluía o cabeçalho em visualizações reduzidas.
* **Causa:** Falta de restrições rígidas de altura no CSS e ausência de um design system compacto para mobile.
* **Solução:** Aplicação de `max-height` e `object-fit: contain` nas imagens dos produtos, reestruturação da Vitrine para 2 colunas no mobile e transformação do botão do carrinho em um ícone circular `🛒` com *badge* indicativo de quantidade.

### Registro 9: Aprimoramento das Ações de Compra e Compartilhamento Social
* **Problema:** O fluxo de navegação exigia que o usuário adicionasse o produto ao carrinho na vitrine sem ver suas especificações, e não havia opção de compra rápida ou compartilhamento.
* **Causa:** Arquitetura antiga focada apenas em botões simples de incremento no card.
* **Solução:** Remoção do botão de adição na vitrine para direcionar a navegação aos detalhes. Implementação da ação "⚡ Comprar Agora" (inclusão direta e redirecionamento para `/carrinho`), remoção contextual de itens e compartilhamento integrado via API do WhatsApp e `navigator.clipboard`.



# Os 5 principais erros reais de código e arquitetura gerados pela Inteligência Artificial durante o desenvolvimento.

---

## 1. Erro de Exportação em Componente (Import/Export Mismatch)
* **Erro da IA:** A IA gerou o componente `CardProduto.jsx` com exportação padrão (`export default`), mas instanciou a importação no arquivo `Vitrine.jsx` com importação nomeada `{ CardProduto }`.
* **Sintoma:** Tela branca na aplicação com o erro `Uncaught SyntaxError: The requested module does not provide an export named 'CardProduto'`.
* **Diagnóstico:** Incompatibilidade entre a declaração da função e a forma de importação no arquivo pai.
* **Correção:** Padronização de todos os componentes do projeto para utilização de exportações nomeadas (`export function NomeComponente`).

---

## 2. Erro de Layout Mobile por Falta de Box-Sizing e Reset Global
* **Erro da IA:** Ao gerar as regras de CSS para o cabeçalho e carrinho, a IA definiu larguras fixas em pixels (`width: 340px`, `height: 76px`) sem aplicar o reset do CSS Grid/Flexbox e `box-sizing: border-box`.
* **Sintoma:** Elementos do cabeçalho cobrindo os filtros de categoria e criação de barra de rolagem horizontal desproporcional em telas de celular.
* **Diagnóstico:** Ausência de propriedades flexíveis e falta de tratamento de estouro de tela (`overflow-x: hidden`).
* **Correção:** Implementação de regras globais em `index.css` com `box-sizing: border-box`, `flex-wrap: wrap` no cabeçalho e `grid-template-columns: repeat(2, 1fr)` para celulares.

---

## 3. Imagens Desproporcionais e Quebra do Grid de Recomendados
* **Erro da IA:** Na primeira versão da tela de detalhes (`DetalheProduto.jsx`), a IA renderizou as imagens dos produtos recomendados sem limitação de altura e sem a propriedade `object-fit`.
* **Sintoma:** Os cards de recomendações ocupavam quase a tela inteira, empurrando a área de avaliações para o final e distorcendo a proporção original das imagens da API.
* **Diagnóstico:** Falta de trava de dimensões máximas nas imagens descendentes dos cards recomendados.
* **Correção:** Ajuste no CSS (`DetalheProduto.css`) adicionando `height: 80px` e `object-fit: contain` nas imagens dos cards secundários, compactando a grade.

---

## 4. Perda de Estado do Carrinho ao Recarregar a Página (F5)
* **Erro da IA:** A estrutura inicial do `CarrinhoContext` proposta pela IA mantinha os produtos selecionados apenas em um estado do React (`useState([])`).
* **Sintoma:** Sempre que o usuário atualizava a página (`F5`), o carrinho era completamente zerado.
* **Diagnóstico:** Ausência de sincronização do estado global com o armazenamento persistente do navegador.
* **Correção:** Adição de leitura inicial do `localStorage` no `useState` do contexto e uso do hook `useEffect` para salvar o carrinho automaticamente a cada alteração.

---

## 5. Erro 404 ao Recarregar Rotas Dinâmicas no Servidor da Vercel
* **Erro da IA:** A IA configurou as rotas no React Router (`/product/:id` e `/carrinho`), mas não incluiu o arquivo de suporte para servidores de hospedagem estática.
* **Sintoma:** Ao recarregar a página (F5) estando na rota de um produto na Vercel, o navegador exibia a página de erro `404: NOT_FOUND`.
* **Diagnóstico:** Em Single Page Applications (SPAs), o servidor web tenta procurar uma pasta/arquivo físico no caminho da URL que não existe no disco.
* **Correção:** Criação do arquivo `vercel.json` na raiz do projeto com regra de reescrita (*rewrites*) direcionando todas as rotas para o `/index.html`.