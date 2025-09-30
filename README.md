# 🚀 MonitoreAI

Uma API completa para monitoramento de sites com notificações automáticas via WhatsApp e sistema de planos diferenciados.

## 📋 Sobre o Projeto

O MonitoreAI é uma solução robusta para monitoramento de sites que oferece verificação automática de status, notificações via WhatsApp e um sistema de planos (Free e Premium) com diferentes limitações e funcionalidades.

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados principal
- **JWT** - Autenticação e autorização
- **bcrypt** - Criptografia de senhas

### Infraestrutura e Deploy

- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Render** - Plataforma de deploy
- **node-cron** - Agendamento de tarefas

### Integrações e Notificações

- **Twilio** - Envio de mensagens WhatsApp
- **Nodemailer** - Envio de emails
- **node-fetch** - Requisições HTTP para verificação de sites

### Documentação e Desenvolvimento

- **Swagger/OpenAPI** - Documentação da API
- **Nodemon** - Desenvolvimento com hot reload
- **dotenv** - Gerenciamento de variáveis de ambiente

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação

- Registro de usuários com validação
- Login com JWT
- Middleware de autenticação
- Exclusão de conta

### 👤 Gerenciamento de Usuários

- Perfis de usuário com informações pessoais
- Atualização de dados (WhatsApp)
- Sistema de planos (Free/Premium)
- Histórico de mudanças de plano

### 🌐 Monitoramento de Sites

- Adição de sites para monitoramento
- Verificação automática de status
- Intervalos configuráveis por plano
- Status em tempo real
- Remoção de sites

### 📱 Sistema de Notificações

- Notificações via WhatsApp quando sites ficam offline
- Integração com Twilio
- Mensagens de teste
- Configuração de número de telefone

### ⚡ Planos e Limitações

#### Plano Free

- 1 site máximo
- Intervalo mínimo: 60 minutos
- Notificações básicas

#### Plano Premium

- Sites ilimitados
- Intervalo mínimo: 1 minuto
- Notificações avançadas
- Suporte prioritário

## 🏗️ Arquitetura

O projeto segue uma arquitetura limpa com separação de responsabilidades:

```
src/
├── application/          # Lógica de negócio
│   ├── siteStatusService.js
│   └── updateSiteStatus.js
├── infrastructure/       # Camada de infraestrutura
│   ├── http/            # Rotas e controllers
│   │   └── routes/
│   ├── scheduler/       # Agendamento de tarefas
│   └── services/        # Serviços externos
├── middleware/          # Middlewares customizados
└── config/             # Configurações
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- PostgreSQL (se executando localmente)

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd MonitoreAI
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/monitor"
JWT_SECRET="sua-chave-secreta-jwt"
TWILIO_ACCOUNT_SID="seu-twilio-sid"
TWILIO_AUTH_TOKEN="seu-twilio-token"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-email"
NODE_ENV="development"
```

### 3. Execute com Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f app
```

### 4. Ou execute localmente

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate deploy
npx prisma generate

# Inicializar banco (dados de exemplo)
npm run db:init

# Executar em modo desenvolvimento
npm run dev

# Executar em produção
npm start
```

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger:

- **Produção**: `https://monitoreai-api.onrender.com/api-docs`
- **Desenvolvimento**: `http://localhost:3000/api-docs`

### Endpoints Principais

#### Autenticação

- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Fazer login
- `PATCH /auth/plan` - Alterar plano
- `PATCH /auth/whatsapp` - Atualizar WhatsApp
- `DELETE /auth/delete` - Deletar conta

#### Sites

- `POST /sites` - Adicionar site
- `GET /sites` - Listar sites
- `GET /sites/{id}/status` - Verificar status
- `DELETE /sites/{id}` - Remover site

#### WhatsApp

- `POST /sites/test-whatsapp` - Testar envio

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento com nodemon
npm start           # Produção
npm run build       # Build e migração do banco
npm run db:init     # Inicializar banco com dados
```

## 🐳 Docker

O projeto inclui configuração completa do Docker:

- **Dockerfile** - Imagem da aplicação
- **docker-compose.yml** - Orquestração com PostgreSQL
- **render.yaml** - Configuração para deploy no Render

## 📊 Banco de Dados

### Modelos Principais

- **User** - Usuários do sistema
- **Site** - Sites monitorados
- **PlanHistory** - Histórico de mudanças de plano

### Migrações

```bash
npx prisma migrate dev    # Desenvolvimento
npx prisma migrate deploy # Produção
npx prisma generate       # Gerar cliente
```

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Validação de entrada
- CORS configurado
- Variáveis de ambiente para dados sensíveis

## 📈 Monitoramento

- Health check endpoint (`/`)
- Logs estruturados
- Verificação automática de sites
- Notificações de falhas

## 🌐 Deploy

O projeto está configurado para deploy no **Render** com:

- Build automático via Docker
- Banco PostgreSQL gerenciado
- Variáveis de ambiente seguras
- Health checks automáticos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email: support@monitoreai.com

---

**MonitoreAI** - Mantenha seus sites sempre online! 🚀
