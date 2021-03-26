import express from "express"
import { logger } from "../logger/logger.js"
import { inicializaRotas } from "./routes.js"

function inicializaServidorHttp() {
    const server = express()
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json())

    inicializaRotas(server)

    const port = process.env.SYS_PORT || 8080
    server.listen(port, () => logger.info(`Servidor ativo em http://localhost:${port}`))
}

export { inicializaServidorHttp }