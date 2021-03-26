import { ProcessaTesouroDireto } from "../domain/usecases/tesourodireto.js"

async function LeEstoqueTD(req, res) {
    const idUser = "M" // Simula qual usuário está logado
    const td = new ProcessaTesouroDireto()
    const estoque = await td.leEstoqueComCotacoesAtuais(idUser)

    return res.json(estoque)
}

export { LeEstoqueTD }