import dotenv from 'dotenv'
import { logger } from '../logger/logger'

function inicializaVariaveisAmbiente() {
    dotenv.config()

    let temErro = false

    if (process.env.DB_HOST === undefined) {
        logger.error("Variável de Ambiente não Definida: DB_HOST")
        temErro = true
    }

    if (process.env.DB_PORT === undefined) {
        logger.error("Variável de Ambiente não Definida: DB_PORT")
        temErro = true
    }

    if (process.env.DB_USER === undefined) {
        logger.error("Variável de Ambiente não Definida: DB_USER")
        temErro = true
    }

    if (process.env.DB_PASSWORD === undefined) {
        logger.error("Variável de Ambiente não Definida: DB_PASSWORD")
        temErro = true
    }

    if (process.env.DB_NAME === undefined) {
        logger.error("Variável de Ambiente não Definida: DB_NAME")
        temErro = true
    }

    if (temErro === true) {
        throw "Variáveis de Ambiente Obrigatórias não Definidas"
    }
}

export { inicializaVariaveisAmbiente }

