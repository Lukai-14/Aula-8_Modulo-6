# Diário de Uso da IA no Desenvolvimento

## 🎯 Objetivo
Relatar as decisões técnicas, a resolução de problemas e o aprendizado obtido através da colaboração com o assistente de IA na construção do projeto **Vitrine Alegre**.

## 🧠 Principais Decisões de Arquitetura
1. **Centralização do Estado com Context API:** Para evitar o compartilhamento manual de propriedades entre múltiplos níveis de componentes, o `CarrinhoContext` foi mantido para gerenciar os produtos selecionados, persistência no `localStorage` e cálculo do total.
2. **Tratamento de Erros de Execução:** Durante a refatoração, erros de importação geraram falhas no React. A IA auxiliou no diagnóstico via Console do Navegador (F12) e na identificação rápida de incoerências entre exportações padrão e nomeadas.
3. **Controle de Versão Seguro (Git):** O uso de commits frequentes (`git add .` e `git commit`) foi adotado como boa prática para garatir pontos de restauração estáveis antes de realizar alterações complexas no código.

## 🛠️ Desafios Resolvidos
- **Sobreposição no Mobile:** Ajuste de dimensões fixas no cabeçalho CSS para garantir a acessibilidade e usabilidade em telas pequenas.
- **Roteamento Dinâmico:** Implementação de regras de navegação no `Cabecalho` permitindo que a pesquisa de produtos funcione perfeitamente de qualquer página da aplicação.
- **Erros de Conexão:** Validação de que a falha ao carregar dados da API exibe uma mensagem amigável ao usuário em vez de quebrar a interface.