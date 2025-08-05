# INFINITY-SCHOOL-Dev-Full-Stack-Projeto-Final

Este é um sistema completo de gerenciamento de **áreas, usuários, recursos e acessos** internos das Indústrias Wayne. A aplicação simula um ambiente corporativo seguro, com múltiplos níveis de acesso.

## Funcionalidades

- Autenticação de usuários com JWT
- Diferenciação de permissões por **cargo/role**
- Cadastro e edição de **áreas**, **usuários** e **recursos**
- Visualização de **logs de acesso**
- Gráficos com tentativas de acesso e uso de recursos
- Toasts e feedback visual para interações
- Interface responsiva, escura e estilizada com a identidade das Indústrias Wayne

## Tipos de usuários

**administrador**: Acesso total: gerencia usuários, áreas, recursos e vê todos os logs.
**gerente**: Gerencia áreas e recursos, visualiza logs, mas **não** pode gerenciar usuários.
**funcionário**: Apenas visualiza áreas e tenta acessá-las. Não pode editar nada.

## Tecnologias utilizadas

- **Frontend**: React + Vite + TailwindCSS + ShadCN
- **Backend**: Node.js + Express + PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT
- **Validação**: Zod
- **Gráficos**: Recharts

### Pré-requisitos

- Node.js 18+
- PostgreSQL 13+
- npm

### 1. Clone o repositório

git clone https://github.com/LucasSBarros/INFINITY-SCHOOL-Dev-Full-Stack-Projeto-Final.git
cd INFINITY-SCHOOL-Dev-Full-Stack-Projeto-Final

### 2. Instale as dependências e Crie o .env do backend.

cd backend
npm install

Configure o .env com as credenciais do seu banco (DATABASE_URL) e com as demais informações constantes no .env.example como JWT_SECRET, PORT dentro da pasta backend.

### 3. Prepare o banco de dados.

# Gere as tabelas e aplique a migration

npx prisma migrate dev --name init

# Gere o cliente Prisma

npx prisma generate

# Execute a seed

npx prisma db seed

### 4. Rode o backend

npm run dev

### 5. Rode o frontend

cd ../frontend
npm install

# Rode a aplicação

npm run dev

# Usuários pré-cadastrados:

nome: Bruce Wayne,
email: "bruce@wayne.com,
senha: batman123,
cargo: administrador,

nome: "Lucius Fox",
email: "lucius@wayne.com",
senha: hash("wayne123"),
cargo: "gerente",

nome: "Dick Grayson",
email: "dick@wayne.com",
senha: hash("robin123"),
cargo: "funcionario",
