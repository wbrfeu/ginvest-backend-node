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

    // --------------------------------------------------------------------------------------

    let idUser = "M" // Vai ser obtido de um token do login - TODO

    // Teste de Requisição de Estoque - depois vai ser pedido pelo Frontend
    let db = new Database()
    // let r = await db.leEstoqueAtualTD(idUser)
    // console.log(`Estoque antes de Processar NN: `)
    // console.log(r)

    // Teste de Processar nova Nota de Negociação - depois vai ser pedido pelo Frontend
    let td = new ProcessaTesouroDireto()
    td.setDatabase(db)

    let novaNN = []
    let td10 = new MovimentoTD("W", 10, "Easy", "LFT25", "10/02/2021", "C", null, 100, 1400)
    let td20 = new MovimentoTD("W", 10, "Easy", "LFT25", "10/02/2021", "V", null, 120, 1800)
    novaNN.push(td10)
    novaNN.push(td20)

    await td.processaESalvaNovaNotaNegociacao(novaNN, idUser)
}

main()


