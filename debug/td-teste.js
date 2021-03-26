import { inicializaInfra } from '../infra/init-infra.js'
import { DaoMovimentoTD } from '../infra/database/dao-movimento-td.js'
import { ProcessaTesouroDireto } from '../domain/usecases/tesourodireto.js'
import { MovimentoTD } from '../domain/entities/tesourodireto.js'
import { CotacoesTesouroDireto } from '../domain/usecases/cotacoes-td.js'
import { ApiTesouroDireto } from '../infra/apis-externas/api-td.js'
import { DaoCotacoesTD } from '../infra/database/dao-cotacoes-td.js'
import { logger } from '../infra/logger/logger.js'


async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        logger.error(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    logger.info(`Sistema ${process.env.APP_NAME} Inicializado`)

    // --------------------------------------------------------------------------------------

    //=================================================================
    // Insere o  ESTOQUE INICIAL :
    // let idUser = "M" // Simula qual usuário está logado
    // let td = new ProcessaTesouroDireto()
    // let novaNN = []
    // const td1 = new MovimentoTD("M", 1, "Easy", "BRSTNCLF1RC4", "1/2/2021", "c", null, 7, 70000)
    // const td2 = new MovimentoTD("M", 2, "Easy", "BRSTNCLF1RC4", "2/2/2021", "c", null, 8, 80000)
    // const td3 = new MovimentoTD("M", 3, "Clear", "BRSTNCLTN7U7", "3/2/2021", "c", null, 9, 5400)
    // const td4 = new MovimentoTD("M", 4, "Easy", "BRSTNCLF1RC4", "4/2/2021", "c", null, 10, 100000)
    // novaNN.push(td4)
    // novaNN.push(td1)
    // novaNN.push(td3)
    // novaNN.push(td2)
    // console.log(novaNN.length)
    // await td.processaESalvaNovaNotaNegociacao(novaNN, idUser)
    // // ---------------------
    // idUser = "W" // Simula qual usuário está logado
    // novaNN = []
    // const td5 = new MovimentoTD("W", 1, "Easy", "BRSTNCLF1RC4", "1/2/2021", "c", null, 7, 70000)
    // const td6 = new MovimentoTD("W", 2, "Easy", "BRSTNCLF1RC4", "2/2/2021", "c", null, 8, 80000)
    // const td7 = new MovimentoTD("W", 3, "Clear", "BRSTNCLTN7U7", "3/2/2021", "c", null, 9, 5400)
    // const td8 = new MovimentoTD("W", 4, "Easy", "BRSTNCLF1RC4", "4/2/2021", "c", null, 10, 100000)
    // novaNN.push(td5)
    // novaNN.push(td6)
    // novaNN.push(td7)
    // novaNN.push(td8)
    // console.log(novaNN.length)
    // await td.processaESalvaNovaNotaNegociacao(novaNN, idUser)
    //=================================================================

    //=================================================================
    // LÊ o ESTOQUE ATUAL do usuário indicado. Sem as cotações:
    // let idUser = "M" // Simula qual usuário está logado
    // let dao = new DaoMovimentoTD()
    // let r = await dao.leEstoqueAtualTD(idUser)
    // console.log(`Estoque Atual: `)
    // console.log(r)
    //=================================================================

    //=================================================================
    // Teste Insere e Processar Nova Nota de Negociação
    // let idUser = "M" // Simula qual usuário está logado
    // let td = new ProcessaTesouroDireto()
    // let novaNN = []
    // let td10 = new MovimentoTD("M", 10, "Easy", "BRSTNCLTN7N2", "10/02/2021", "C", null, 1, 1*720)
    // let td20 = new MovimentoTD("M", 10, "Easy", "BRSTNCLF1RC4", "10/02/2021", "v", null, 25, 25*11000)
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
    // Teste de Leitura de Cotações do BD:
    // const cottd = new CotacoesTesouroDireto()
    // const listaCot = await cottd.leCotacoesAtuais()
    //================================================================

    //================================================================
    // Teste de Uso da API tesouro e o BD tesouro e da Cache
    // const cot = new CotacoesTesouroDireto()
    // console.log("_________________ Primeira Leitura")
    // let listaCotacoesTD = await cot.leCotacoesAtuais()
    // console.log(listaCotacoesTD)
    // console.log("=======================================================")
    // console.log("_________________ Segunda Leitura da cache")
    // listaCotacoesTD = await cot.leCotacoesAtuais()
    // console.log(listaCotacoesTD)    
    //================================================================

    //================================================================
    // Teste de Junção Estoque Atual com Cotações Atuais
    // const idUser = "M" // Simula qual usuário está logado
    // const td = new ProcessaTesouroDireto()
    // const estoque = await td.leEstoqueComCotacoesAtuais(idUser)
    // console.log("=============================================")
    // console.log(estoque)    
    //================================================================
}

main()



// NÃO ESTÁ SENDO USADO:
//=================================================================
    // Inicializa Objetos necessários ao teste "Insere o Estoque Inicial e Processa Nova Nota
    // de Negociação" - os scripts seguintes
    // let idUser = "M" // Simula qual usuário está logado
    // let td = new ProcessaTesouroDireto()
    //=================================================================