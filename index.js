import { inicializaInfra } from './infra/init-infra.js'
import { Database } from './infra/database/database.js' // TODO - Somente um teste APAGAR
import { ProcessaTesouroDireto } from './domain/usecases/tesourodireto.js' // TODO - Somente um teste APAGAR
import { MovimentoTD } from './domain/entities/tesourodireto.js'

async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        console.error(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    console.log(`Sistema ${process.env.APP_NAME} Inicializado`)

 
}

main()


