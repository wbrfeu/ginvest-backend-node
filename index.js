import { inicializaInfra } from './infra/start.js'
import { Database } from './infra/database/database.js' // TODO - Somente um teste APAGAR

async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        console.error(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    console.log(`Sistema ${process.env.APP_NAME} Inicializado`) 

    // Teste de Requisição de Estoque - depois vai ser pedido pelo Frontend
    let db = new Database()
    let r = await db.leEstoqueAtualTD()
    console.log(`Deu certo ->`)
    console.log(r)
}

main()

