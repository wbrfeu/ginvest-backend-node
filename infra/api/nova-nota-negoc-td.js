import { MovimentoTD } from "../../domain/entities/tesourodireto.js"
import { ProcessaTesouroDireto } from "../../domain/usecases/tesourodireto.js"

async function novaNotaNegocTD(request, response) {
    const idUser = request.idUsuarioLogado
    const objNN = request.body
    const novaNN = []
    const td = new ProcessaTesouroDireto()

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
            element.quantidade,
            element.valorLiquido
        )

        novaNN.push(item)
    }

    await td.processaESalvaNovaNotaNegociacao(novaNN, idUser)

    return response.status(200).send("OK")
}

export { novaNotaNegocTD }