import app from "./app"
import { config } from "./config"
import prisma from "./prisma/client"

async function main() {
  try {
    await prisma.$connect()
    console.log("[DB] Connected to PostgreSQL")

    app.listen(config.port, () => {
      console.log(`[Server] Running on http://localhost:${config.port}`)
    })
  } catch (err) {
    console.error("[Fatal] Failed to start server:", err)
    process.exit(1)
  }
}

main()
