import { inicializaVariaveisAmbiente } from './environment/init-env.js'
import { inicializaDatabase } from './database/init-database.js'
import { inicializaLogger, logger } from './logger/logger.js'
import { inicializaServidorHttp } from './server/init-server.js'

// Inicializa todos os recursos necessários ao funcionamento do sistema

async function inicializaInfra() {
    inicializaLogger()
    inicializaVariaveisAmbiente()
    await inicializaDatabase()
    inicializaServidorHttp()
}

export { inicializaInfra }