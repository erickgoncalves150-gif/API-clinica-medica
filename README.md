# API Clínica Médica

## 1. Contexto

Este projeto consiste no desenvolvimento de uma API REST para gerenciamento de uma clínica médica. A aplicação permite cadastrar, consultar, atualizar e excluir médicos, pacientes e consultas, além de realizar o vínculo entre consultas, médicos e pacientes.

## 2. Tecnologias utilizadas

- Node.js
- JavaScript (ES Modules)
- Express
- MySQL
- Postman

## 3. Instalação

1. Clone este repositório:

```bash
git clone URL_DO_REPOSITORIO
```

2. Entre na pasta do projeto:

```bash
cd api-clinica-medica
```

3. Instale as dependências:

```bash
npm install
```

## 4. Configuração do banco de dados

1. Certifique-se de ter o MySQL instalado.
2. Crie o banco de dados `clinica_medica`.
3. Execute o arquivo `banco.sql` para criar as tabelas necessárias.
4. Configure as credenciais de acesso ao MySQL no arquivo `database/conexao.js`.

## 5. Executando a aplicação

Inicie o servidor com:

```bash
node app.js
```

O servidor será iniciado na porta 3000.

## 6. Rotas da API

### Médicos

| Método | Rota | Funcionalidade |
|---|---|---|
| POST | `/medico` | Cadastrar médico |
| GET | `/medico` | Listar médicos |
| GET | `/medico/:id` | Buscar médico por ID |
| PATCH | `/medico/:id` | Atualizar médico |
| DELETE | `/medico/:id` | Excluir médico |

### Pacientes

| Método | Rota | Funcionalidade |
|---|---|---|
| POST | `/paciente` | Cadastrar paciente |
| GET | `/paciente` | Listar pacientes |
| GET | `/paciente/:id` | Buscar paciente por ID |
| PATCH | `/paciente/:id` | Atualizar paciente |
| DELETE | `/paciente/:id` | Excluir paciente |

### Consultas

| Método | Rota | Funcionalidade |
|---|---|---|
| POST | `/consulta` | Cadastrar consulta |
| GET | `/consulta` | Listar consultas |
| GET | `/consulta/:id` | Buscar consulta por ID |
| PATCH | `/consulta/:id` | Atualizar consulta |
| DELETE | `/consulta/:id` | Excluir consulta |
| PATCH | `/consulta/:idConsulta/medico/:idMedico` | Vincular médico à consulta |
| PATCH | `/consulta/:idConsulta/remover-medico` | Remover médico da consulta |
| PATCH | `/consulta/:idConsulta/paciente/:idPaciente` | Vincular paciente à consulta |
| PATCH | `/consulta/:idConsulta/remover-paciente` | Remover paciente da consulta |

## 7. Testes

Os testes das 19 rotas foram realizados utilizando o Postman.

As evidências dos testes estão organizadas na pasta `docs/testes`, separadas por médicos, pacientes e consultas.

A coleção utilizada nos testes será disponibilizada junto ao projeto.
