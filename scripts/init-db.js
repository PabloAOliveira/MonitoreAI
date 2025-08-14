import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔄 Verificando conexão com o banco de dados...');
    
    // Testa a conexão
    await prisma.$connect();
    console.log('✅ Conexão com banco de dados estabelecida!');
    
    // Verifica se as tabelas existem
    const userCount = await prisma.user.count();
    console.log(`📊 Usuários no banco: ${userCount}`);
    
    const siteCount = await prisma.site.count();
    console.log(`🌐 Sites no banco: ${siteCount}`);
    
    console.log('🎉 Banco de dados inicializado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();