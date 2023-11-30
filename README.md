# Desafio Técnico 2: API de Autenticação

![Badge](https://img.shields.io/badge/Node.js-v14.17.5-green)
![Badge](https://img.shields.io/badge/Express.js-v4.17.1-blue)
![Badge](https://img.shields.io/badge/SQLite-v5.1.6-orange)
![Badge](https://img.shields.io/badge/JWT-v9.0.2-red)

Desenvolva uma API RESTful para autenticação de usuários, permitindo operações de cadastro, autenticação e recuperação de informações do usuário.

## Funcionalidades

1. **Cadastro de Usuário (Sign Up)**

   - Endpoint: `/api/signup`
   - Método: `POST`
   - Input:
     ```json
     {
       "nome": "string",
       "email": "string",
       "senha": "senha",
       "telefones": [{ "numero": "123456789", "ddd": "12" }]
     }
     ```
   - Output (sucesso):
     ```json
     {
       "id": "GUID/ID",
       "data_criacao": "data",
       "data_atualizacao": "data",
       "ultimo_login": "data",
       "token": "GUID/JWT"
     }
     ```
   - Erro:
     ```json
     { "mensagem": "E-mail já existente" }
     ```

2. **Autenticação de Usuário (Sign In)**

   - Endpoint: `/api/signin`
   - Método: `POST`
   - Input:
     ```json
     {
       "email": "string",
       "senha": "senha"
     }
     ```
   - Output (sucesso):
     ```json
     {
       "id": "GUID/ID",
       "data_criacao": "data",
       "data_atualizacao": "data",
       "ultimo_login": "data",
       "token": "GUID/JWT"
     }
     ```
   - Erro:
     ```json
     { "mensagem": "Usuário e/ou senha inválidos" }
     ```

3. **Buscar Usuário**
   - Endpoint: `/api/user`
   - Método: `GET`
   - Requisição: Header `Authorization` com valor "Bearer {token}"
   - Erros:
     ```json
     { "mensagem": "Não autorizado" }
     { "mensagem": "Sessão inválida" }
     ```

## Requisitos

- Persistência de dados usando SQLite.
- Framework: Express.js.
- JWT como token.
- Testes unitários (Jest).
- Criptografia hash na senha e no token.
- Repositório no GitHub.
- Hospedagem no Heroku.

## Configuração e Instalação

1. Clone o repositório.
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
