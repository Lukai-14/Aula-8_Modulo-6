# Diário de Uso da IA no Desenvolvimento

## Objetivo
Relatar as decisões técnicas, a resolução de problemas e o aprendizado obtido através da colaboração com o assistente de IA na construção do projeto **Vitrine Alegre**.

## Principais Decisões de Arquitetura
1. **Centralização do Estado com Context API:** Para evitar o compartilhamento manual de propriedades entre múltiplos níveis de componentes, o `CarrinhoContext` foi mantido para gerenciar os produtos selecionados, persistência no `localStorage` e cálculo do total.
2. **Tratamento de Erros de Execução:** Durante a refatoração, erros de importação geraram falhas no React. A IA auxiliou no diagnóstico via Console do Navegador (F12) e na identificação rápida de incoerências entre exportações padrão e nomeadas.
3. **Controle de Versão Seguro (Git):** O uso de commits frequentes (`git add .` e `git commit`) foi adotado como boa prática para garatir pontos de restauração estáveis antes de realizar alterações complexas no código.

## Desafios Resolvidos
- **Sobreposição no Mobile:** Ajuste de dimensões fixas no cabeçalho CSS para garantir a acessibilidade e usabilidade em telas pequenas.
- **Roteamento Dinâmico:** Implementação de regras de navegação no `Cabecalho` permitindo que a pesquisa de produtos funcione perfeitamente de qualquer página da aplicação.
- **Erros de Conexão:** Validação de que a falha ao carregar dados da API exibe uma mensagem amigável ao usuário em vez de quebrar a interface.

## Semana do dia 17/09 a 24/09

# Diário de Uso de Inteligência Artificial — Vitrine Alegre

Este documento registra os principais problemas, erros de build/deploy e desafios de arquitetura enfrentados durante o desenvolvimento do projeto **Vitrine Alegre**, acompanhados das respectivas soluções aplicadas com auxílio da IA.

---

## Registros de Erros e Soluções

### Registro 1: Erro 404 (NOT_FOUND) ao recarregar a página na Vercel
* **Problema:** Ao navegar para rotas como `/carrinho` ou `/produto/:id` e recarregar a página (F5) na Vercel, o servidor retornava erro `404: NOT_FOUND`.
* **Causa:** Por se tratar de uma Single Page Application (SPA) construída com React Router, a Vercel tentava buscar um arquivo físico no caminho da URL que não existia no servidor.
* **Solução:** Criação do arquivo `vercel.json` na raiz do projeto com a regra de reescrita (*rewrites*) redirecionando todas as requisições `/(.*)` para o `/index.html`.

---

### Registro 2: Estrutura de pastas aninhadas no repositório Git
* **Problema:** O código do React e os arquivos de documentação estavam divididos dentro de uma subpasta (`meu-projeto`) dentro da pasta principal (`Aula-8_Modulo 6`).
* **Causa:** O repositório Git foi inicializado na pasta pai em vez da pasta raiz do projeto React.
* **Solução:** Movel-se todos os arquivos do React (`src/`, `public/`, `package.json`, etc.) diretamente para a raiz do repositório, garantindo conformidade com a estrutura exigida pelo professor.

---

### Registro 3: Apontamento incorreto do *Root Directory* na Vercel
* **Problema:** A Vercel falhava na compilação ou não encontrava os scripts do `package.json` após a reorganização das pastas.
* **Causa:** O painel da Vercel estava configurado para buscar o build dentro do diretório `/meu-projeto`, que havia sido eliminado.
* **Solução:** Acesso às configurações do projeto na Vercel (`Settings -> Build and Deployment`) e limpeza do campo **Root Directory** para apontar diretamente para a raiz.

---

### Registro 4: Duplicidade de arquivos de documentação e artefatos de backup
* **Problema:** Existiam arquivos `.md` e backups zipados espalhados tanto na raiz quanto dentro de subpastas do projeto.
* **Causa:** Acúmulo de arquivos gerados em etapas anteriores da aula.
* **Solução:** Comparação das versões mais atualizadas do `README.md`, `PROMPTS.md` e `DIARIO-DA-IA.md`, consolidação dos dados na raiz e remoção dos arquivos duplicados e backups `.zip`.

---

### Registro 5: Erro de *Staged Changes* no Git ao realizar o Commit pelo VS Code
* **Problema:** Ao tentar fazer o commit após mover os arquivos de pasta, o VS Code exibia a mensagem *"There are no staged changes to commit"*.
* **Causa:** As alterações e exclusões massivas de arquivos precisavam ser adicionadas ao estágio de preparação (*stage*) do Git.
* **Solução:** Confirmação do diálogo do VS Code para incluir automaticamente todas as alterações no *stage* (`git add .`) antes da execução do `git commit` e `git push`.