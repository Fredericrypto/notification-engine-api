# ⚡ Notification & Webhook Engine (Node.js + TypeScript)

Uma API RESTful e assíncrona focada no disparo resiliente de notificações e entrega de webhooks, garantindo idempotência e reentrega automatizada (*retry mechanism*).

## 🎯 Problemas de Engenharia Resolvidos
- **Idempotência:** Evita disparos de e-mail ou webhooks duplicados.
- **Resiliência:** Filas de processamento para lidar com falhas de serviços terceiros.
- **Performance:** Processamento em segundo plano sem bloquear a resposta HTTP.

## 🛠️ Tech Stack
- **Runtime:** Node.js & TypeScript
- **Framework Web:** Fastify
- **Banco de Dados:** PostgreSQL & Prisma ORM
- **Mensageria/Filas:** Redis & BullMQ

