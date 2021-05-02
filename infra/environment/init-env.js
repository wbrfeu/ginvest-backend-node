import dotenv from 'dotenv'
import { logger } from '../logger/logger.js'

// TODO - Faltando variáveis de ambiente, por exemplo oauth2 do google.
function inicializaVariaveisAmbiente() {
    dotenv.config()

    let temErro = false

    // Variáveis para inicializar o Banco Postgres

    if (process.env.DB_HOST === undefined || process.env.DB_HOST === "") {
        logger.error("Variável de Ambiente não Definida: DB_HOST")
        temErro = true
    }

    if (process.env.DB_PORT === undefined || process.env.DB_PORT === "") {
        logger.error("Variável de Ambiente não Definida: DB_PORT")
        temErro = true
    }

    if (process.env.DB_USER === undefined || process.env.DB_USER === "") {
        logger.error("Variável de Ambiente não Definida: DB_USER")
        temErro = true
    }

    if (process.env.DB_PASSWORD === undefined || process.env.DB_PASSWORD === "") {
        logger.error("Variável de Ambiente não Definida: DB_PASSWORD")
        temErro = true
    }

    if (process.env.DB_NAME === undefined || process.env.DB_NAME === "") {
        logger.error("Variável de Ambiente não Definida: DB_NAME")
        temErro = true
    }

    // Utilizar o login do Google
    if (process.env.GOOGLE_CLIENT_ID === undefined || process.env.GOOGLE_CLIENT_ID === "") {
        logger.error("Variável de Ambiente não Definida: GOOGLE_CLIENT_ID")
        temErro = true
    }

    if (process.env.GOOGLE_CLIENT_SECRET === undefined || process.env.GOOGLE_CLIENT_SECRET === "") {
        logger.error("Variável de Ambiente não Definida: GOOGLE_CLIENT_SECRET")
        temErro = true
    }

    if (process.env.GOOGLE_REDIRECT_URI === undefined || process.env.GOOGLE_REDIRECT_URI === "") {
        logger.error("Variável de Ambiente não Definida: GOOGLE_REDIRECT_URI")
        temErro = true
    }

    // Usar com a biblioteca JWT
    if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === "") {
        logger.error("Variável de Ambiente não Definida: JWT_SECRET")
        temErro = true
    }

    // Definição da porta para o servidor http
    if (process.env.SYS_PORT === undefined || process.env.SYS_PORT === "") {
        logger.error("Variável de Ambiente não Definida: SYS_PORT")
        temErro = true
    }


    if (temErro === true) {
        throw "Variáveis de Ambiente Obrigatórias não Definidas"
    }
}

export { inicializaVariaveisAmbiente }

