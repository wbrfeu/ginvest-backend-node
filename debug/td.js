import { inicializaInfra } from '../infra/init-infra.js'
import { DaoMovimentoTD } from '../infra/database/dao-movimento-td.js'
import { ProcessaTesouroDireto } from '../domain/usecases/tesourodireto.js'
import { MovimentoTD } from '../domain/entities/tesourodireto.js'
import { CotacoesTesouroDireto } from '../domain/usecases/cotacoes-td.js'
import { ApiTesouroDireto } from '../infra/apis-externas/api-td.js'
import { DaoCotacoesTD } from '../infra/database/dao-cotacoes-td.js'


async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        console.error(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    console.log(`Sistema ${process.env.APP_NAME} Inicializado`)

    // --------------------------------------------------------------------------------------

    //=================================================================
    // Lê o Estoque Atual do usuário indicado:
    // let idUser = "M" // Simula qual usuário está logado
    // let dao = new DaoMovimentoTD()
    // let r = await dao.leEstoqueAtualTD(idUser)
    // console.log(`Estoque antes de Processar NN: `)
    // console.log(r)
    //=================================================================

    //=================================================================
    // Inicializa Objetos necessários ao teste "Insere o Estoque Inicial e Processa Nova Nota
    // de Negociação" - os scripts seguintes
    // let idUser = "M" // Simula qual usuário está logado
    // let td = new ProcessaTesouroDireto()
    //=================================================================

    //=================================================================
    // Insere o Estoque Inicial:
    // const novaNN = []
    // const td1 = new MovimentoTD("M", 1, "Easy", "LFT25", "1/2/2021", "c", null, 70, 700)
    // const td2 = new MovimentoTD("W", 2, "Easy", "LFT25", "2/2/2021", "c", null, 80, 880)
    // const td3 = new MovimentoTD("M", 3, "Clear", "LTN35", "3/2/2021", "c", null, 90, 1080)
    // const td4 = new MovimentoTD("M", 4, "Easy", "LFT25", "4/2/2021", "c", null, 100, 1300)
    // novaNN.push(td4)
    // novaNN.push(td1)
    // novaNN.push(td3)
    // novaNN.push(td2)
    // await td.processaESalvaNovaNotaNegociacao(novaNN, idUser)
    //=================================================================

    //=================================================================
    // Teste de Processar nova Nota de Negociação - depois vai ser pedido pelo Frontend
    // let novaNN = []
    // let td10 = new MovimentoTD("M", 10, "Easy", "LFT25", "10/02/2021", "C", null, 100, 1400)
    // let td20 = new MovimentoTD("M", 10, "Easy", "LFT25", "10/02/2021", "v", null, 130, 1650)
    // novaNN.push(td10)
    // novaNN.push(td20)
    // await td.processaESalvaNovaNotaNegociacao(novaNN, idUser)
    //=================================================================

    //================================================================
    //Teste de Leitura da API do TD:
    // const api = new ApiTesouroDireto()
    // const listaCot = await api.leApiTD()
    // console.log("Lista de Cotações TD:")
    // console.log(listaCot)
    //================================================================

    //================================================================
    //Teste de Leitura de Data da última Atualização da Tab Cotações_TD:
    // const dao = new DaoCotacoesTD()
    // const d = await dao.leDataUltimAtualizacao()
    // console.log(d)
    //================================================================

    //================================================================
    //Teste de Leitura de Cotações do BD:
    // const cottd = new CotacoesTesouroDireto()
    // const listaCot = await cottd.leCotacoesAtuais()
    //================================================================
}


main()




