import express from "express"
import { logger } from "../logger/logger.js"
import { inicializaRotas } from "./routes.js"
import cors from 'cors'

function inicializaServidorHttp() {
    const server = express()
    server.use(cors())
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json())

    inicializaRotas(server)

    const port = process.env.SYS_PORT
    server.listen(port, () => logger.info(`Servidor ativo em http://localhost:${port}`))
}

export { inicializaServidorHttp }