import { MovimentoTD } from "../../domain/entities/tesourodireto.js"
import { stringToNumber } from "../../domain/tools/conversores.js"
import { ProcessaTesouroDireto } from "../../domain/usecases/tesourodireto.js"
import { capturaErro } from "../servicos/capturaerro.js"
import { validaNotaNegocTD } from '../../domain/usecases/validacao-nn-td.js'
import { excluiTitulosTDNaoPreenchidos } from '../../domain/usecases/exclui-tit-nao-preenc-td.js'

async function novaNotaNegocTD(request, response) {    
    const idUser = request.idUsuarioLogado
    const objNN = request.body
    const novaNN = []
    const td = new ProcessaTesouroDireto()

    // Verifica se existem linhas de títulos vazias e exclui
    excluiTitulosTDNaoPreenchidos(objNN)

    // Validação do objeto recebido do frontend
    const resultadoValidacao = validaNotaNegocTD(objNN)
    if ( resultadoValidacao.status === false) {
        return response.status(406).send("Nota de Negociação Inválida: " + resultadoValidacao.descricao)
    }

    for (let i = 0; i < objNN.titulos.length; i++) {
        const element = objNN.titulos[i]

        const item = new MovimentoTD(
            idUser,
            objNN.numeroNotaNegociacao,
            objNN.idCorretora,
            element.codIsin,
            objNN.dataNegociacao,
            element.indicadorCV,
            null,
            stringToNumber(element.quantidade),
            stringToNumber(element.valorLiquido)
        )

        novaNN.push(item)
    }

    console.log('novaNN: ')
    console.log(novaNN)

    try {
        await td.processaESalvaNovaNotaNegociacao(novaNN, idUser)        
    } catch (error) {
        return response.status(500).send("Erro Interno: " + capturaErro(error))
    }

    return response.status(200).send("OK")
}

export { novaNotaNegocTD }