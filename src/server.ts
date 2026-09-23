import Fastify from 'fastify'

// Inicializa a aplicação Fastify habilitando logs no terminal
const app = Fastify({
  logger: true,
})

// Rota de Health Check (Verificação de Saúde da API)
app.get('/health', async (request, reply) => {
  return reply.status(200).send({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

// Inicia o servidor HTTP na porta 3333
app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`🚀 Server running on ${address}`)
})