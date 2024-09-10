E-commerce Frontend com React.js e Next.js

Frontend de um e-commerce (Loja virtual) de roupas, desenvolvido com React o framework Next.js. Ele oferece algumas funcionalidades como filtros de busca, sistema de autenticação, pesquisa, gerenciamento de carrinho, com objetivo de proporcionar uma experiência de compra online.

Este projeto consome a api "E-commerce Back-end" desenvolvida em conjunto.

Utilização

O projeto está em desenvolvimento, onde desenvolvi apenas mediaqueries para as resoluções 1920x1080, 1440x900 e 1366x768;

Não são exigidas configurações adicionais, apenas recomendado a utilização da porta padrão 3000. *Caso utilize outra porta é necessário ir até o Back-end node e alterar no registro do fastify/cors a nova origem: origin: "http://localhost:3000";

Para executar é necessário abrir um terminal na raiz do projeto, digitar o comando "npm install" para instalar as dependencias e digitar o comando "npm run dev".

🚀 Páginas e Funcionalidades do Sistema

-Home: Apresenta todos os produtos com opções de filtragem;

-Página de Produto: Exibe detalhes específicos de um produto;

-Página de Login: Autenticação do usuário;

-Página de Cadastro: Registro de novos usuários;

-Página de Novo Produto: Permite adicionar novos produtos;

-Página de Carrinho: Gerenciamento dos itens no carrinho;

-Carrinho de Compras: Adicione produtos ao carrinho diretamente da página de produtos.

Gerenciamento de Estado:

Foi criado um contexto (Context API) para compartilhar e gerenciar variáveis e useState entre os componentes.

🔧 Tecnologias Utilizadas

-React.js;

-Next.js;

-CSS: Cada página possui seu próprio arquivo CSS para estilização;

-Fetch API: Para chamadas de API e comunicação com o backend;

-Context API: Para gerenciamento de estado global da aplicação.

🌐 Responsividade

Media Queries: Desenvolvidas para suportar as resoluções 1920x1080, 1440x900 e 1366x768, garantindo uma boa experiência de usuário em diferentes tamanhos de tela.

📁 Estrutura do Projeto

pages/: Contém todas as páginas da aplicação;

components/: Componentes reutilizáveis da interface;

services/: Pasta dedicada para as chamadas de API utilizando Fetch, auth.services e products.services;

contexts/: Pasta para os contextos criados para gerenciar o estado global;

styles/: Arquivos de estilo, com CSS específico para cada página.

