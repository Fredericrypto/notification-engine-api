import Fastify from 'fastify'
import { z } from "zod"

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

// Rota POST para receber o pedido de notificação
app.post("/notifications", async (request, reply) => {
  // 1. Definimos a "regra" (Schema) que os dados recebidos DEVEM seguir
  const createNotificationSchema = z.object({
    recipient: z.string().email("E-mail do destinatário inválido"),
    title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
    content: z.string().min(5, "O conteúdo deve ter no mínimo 5 caracteres"),
    channel: z.enum(["email", "sms", "push"], {
      errorMap: () => ({ message: "O canal deve ser email, sms ou push" }),
    }),
  })

  // 2. Validamos o corpo da requisição (request.body) contra o schema
  const validationResult = createNotificationSchema.safeParse(request.body)

  // 3. Se a validação falhar, retornamos erro 400 (Bad Request) com o motivo
  if (!validationResult.success) {
    return reply.status(400).send({
      message: "Dados inválidos na requisição",
      errors: validationResult.error.format(),
    })
  }

  // 4. Se passou na validação, extraímos os dados tipados
  const { recipient, title, content, channel } = validationResult.data

  // Simulando que a notificação foi aceita para processamento
  return reply.status(201).send({
    message: "Notificação recebida com sucesso e enviada para fila",
    notification: {
      id: crypto.randomUUID(),
      recipient,
      title,
      content,
      channel,
      createdAt: new Date(),
    },
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