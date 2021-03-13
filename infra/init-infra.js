// Inicializa todos os recursos necessários ao funcionamento do sistema

import { inicializaVariaveisAmbiente } from './environment/init-env.js'
import { inicializaDatabase } from './database/init-database.js'

async function inicializaInfra() {
    inicializaVariaveisAmbiente()
    await inicializaDatabase()
}

export { inicializaInfra }