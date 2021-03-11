// Inicializa todos os recursos necessários ao funcionamento do sistema

import { inicializaVariaveisAmbiente } from './environment/start-env.js'
import { inicializaDatabase } from './database/start-database.js'

async function inicializaBackend() {
    inicializaVariaveisAmbiente()
    await inicializaDatabase()
}

export { inicializaBackend }