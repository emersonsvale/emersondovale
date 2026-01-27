# Portfólio Emerson

Portfólio pessoal desenvolvido com Nuxt 4, Tailwind CSS e TypeScript.

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Deploy no Coolify

### Pré-requisitos

1. Repositório no GitHub/GitLab
2. Coolify instalado e configurado na sua VPS
3. Domínio configurado (opcional)

### Passos para Deploy

1. **Configure as variáveis de ambiente no Coolify:**
   - `ADMIN_EMAIL`: Email do administrador
   - `ADMIN_PASSWORD`: Senha do administrador
   - `NODE_ENV`: `production`

2. **No Coolify:**
   - Crie um novo projeto
   - Conecte seu repositório Git
   - O Coolify detectará automaticamente o Dockerfile
   - Configure o domínio (se aplicável)
   - Defina as variáveis de ambiente
   - Inicie o deploy

3. **O Coolify irá:**
   - Fazer build da imagem Docker
   - Executar o container
   - Expor a aplicação na porta configurada

### Variáveis de Ambiente

Copie o arquivo `.env.example` e configure as seguintes variáveis:

- `ADMIN_EMAIL`: Email para login no painel admin
- `ADMIN_PASSWORD`: Senha para login no painel admin
- `NODE_ENV`: Ambiente (production)
- `PORT`: Porta do servidor (geralmente 3000, configurado pelo Coolify)

### Estrutura do Projeto

- `/app`: Código fonte da aplicação
- `/server`: APIs e rotas do servidor
- `/data`: Arquivos JSON com dados (projetos e depoimentos)
- `/public`: Arquivos estáticos
- `/shared`: Tipos TypeScript compartilhados

Check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) for more information.
