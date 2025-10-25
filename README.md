# Cadastro de Discos
Projeto desenvolvido para a disciplina de Desenvolvimento Web III, com o objetivo de desenvolver uma aplicação full-stack para gerenciar um cadastro de discos de vinil e CDs.  
O sistema implementa todas as operações CRUD (Create, Read, Update, Delete), utilizando **Node.js**, **Express** e **TypeScript** no backend para se comunicar com um banco de dados **MongoDB**, e uma interface simples em HTML, CSS e JavaScript no frontend.

---

## Funcionalidades
A interface da aplicação permite:

- Cadastrar um novo disco (vinil ou CD) através de um formulário com campos para título, artista, ano, gênero, formato e preço.
- Listar todos os discos cadastrados em uma tabela.
- Editar as informações de um disco existente (os dados são carregados no formulário para alteração).
- Excluir um disco da coleção, com uma etapa de confirmação.

## Tecnologias Utilizadas
O projeto foi construído com as seguintes tecnologias:

### Backend:
- Node.js 
- Express 
- TypeScript 
- MongoDB
- CORS

### Frontend:
- HTML 
- CSS
- JavaScript

## Pré-requisitos
Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- Node.js
- MongoDB (é necessário que uma instância esteja rodando localmente , por exemplo, via MongoDB Compass ).
- Um gerenciador de pacotes (npm ou yarn).

## Como Executar
1. Clone o repositório:
```Bash
git clone https://github.com/GabrielFrois/cadastro-de-discos.git
cd cadastro-de-discos
```

2. Instale as dependências do Backend:
```Bash
npm install
```

3. Inicie o servidor Backend:
```Bash
npm run dev
``` 
- Abra seu navegador e acesse: http://localhost:3000.

