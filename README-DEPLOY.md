# Deploy da API MonitoreAI no Render

Este guia te ajudará a fazer o deploy da sua API no Render.

## Pré-requisitos

1. Conta no [Render](https://render.com)
2. Repositório Git (GitHub, GitLab ou Bitbucket)
3. Código da API commitado no repositório

## Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que todos os arquivos estão commitados:

```bash
git add .
git commit -m "Preparar para deploy no Render"
git push origin main
```

### 2. Criar o Banco de Dados

1. Acesse o [Dashboard do Render](https://dashboard.render.com)
2. Clique em "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `monitoreai-db`
   - **Database**: `monitoreai`
   - **User**: `monitoreai_user`
   - **Region**: escolha a mais próxima
   - **Plan**: Free
4. Clique em "Create Database"
5. **Importante**: Após a criação, copie a **External Database URL** (não a Internal)
   - Acesse o banco criado no Dashboard
   - Na aba "Info", use a "External Database URL"
   - Formato: `postgresql://user:password@host:port/database`

### 3. Criar o Web Service

1. No Dashboard, clique em "New +" → "Web Service"
2. Conecte seu repositório Git
3. Configure:
   - **Name**: `monitoreai-api`
   - **Language**: Node (não Docker!)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 4. Configurar Variáveis de Ambiente

Na seção "Environment Variables", adicione:

```
NODE_ENV=production
DATABASE_URL=[URL EXTERNA do banco criado no passo 2]
JWT_SECRET=[gere uma chave secreta forte]
TWILIO_ACCOUNT_SID=[seu SID do Twilio]
TWILIO_AUTH_TOKEN=[seu token do Twilio]
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
EMAIL_USER=[seu email]
EMAIL_PASS=[senha do app do email]
```

### 5. Deploy

1. Clique em "Create Web Service"
2. O Render fará o build e deploy automaticamente
3. Aguarde o processo finalizar (pode levar alguns minutos)

### 6. Verificar o Deploy

Após o deploy, você receberá uma URL como:
`https://monitoreai-api.onrender.com`

Teste a API acessando:
- `https://sua-url.onrender.com/auth/` (deve retornar erro 404, mas confirma que está rodando)

## Configurações Importantes

### Auto-Deploy
O Render fará deploy automaticamente sempre que você fizer push para a branch principal.

### Logs
Para ver os logs da aplicação:
1. Acesse seu serviço no Dashboard
2. Clique na aba "Logs"

### Domínio Customizado (Opcional)
Para usar seu próprio domínio:
1. Na aba "Settings" do seu serviço
2. Seção "Custom Domains"
3. Adicione seu domínio

## Troubleshooting

### Erro do Prisma: "Cannot find module '@prisma/engines'"
**Soluções aplicadas no projeto:**
- ✅ `binaryTargets` otimizado: `debian-openssl-3.0.x`
- ✅ Versão Node.js fixada em 20.18.0 (arquivo `.node-version`)
- ✅ Build command com limpeza de cache: `rm -rf node_modules/.prisma`
- ✅ Comando de build simplificado

**Se ainda ocorrer:**
1. No Dashboard do Render: Settings → "Clear build cache"
2. Faça um novo deploy
3. Verifique se a versão do Node está sendo respeitada nos logs

### Erro de Build
- Verifique se o `package.json` está correto
- Confirme se todas as dependências estão listadas
- Limpe o cache: Settings → "Clear build cache"

### Erro de Conexão com Banco
- Verifique se a `DATABASE_URL` está correta (use a EXTERNA)
- Confirme se o banco está rodando
- Teste a conexão localmente primeiro

### Erro 503 (Service Unavailable)
- Verifique os logs para identificar o problema
- Confirme se a porta está configurada corretamente (`process.env.PORT`)
- Aguarde alguns minutos - pode ser inicialização lenta

### App "Dormindo" (Plano Free)
- Normal após 15 min de inatividade
- Primeira requisição pode demorar 30-60 segundos
- Considere upgrade para plano pago se necessário

## Próximos Passos

1. Configure seu frontend para usar a nova URL da API
2. Configure webhooks se necessário
3. Monitore os logs para garantir que tudo está funcionando

## Custos

- **Plano Free**: Inclui 750 horas/mês (suficiente para manter a API rodando 24/7)
- **Limitações**: A aplicação pode "dormir" após 15 minutos de inatividade
- **Upgrade**: Considere o plano pago para aplicações em produção