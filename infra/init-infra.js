// Inicializa todos os recursos necessários ao funcionamento do sistema

import { inicializaVariaveisAmbiente } from './environment/init-env.js'
import { inicializaDatabase } from './database/init-database.js'
import { inicializaLogger } from './logger/logger.js'

async function inicializaInfra() {
    inicializaVariaveisAmbiente()
    inicializaLogger()
    await inicializaDatabase()
}

export { inicializaInfra }