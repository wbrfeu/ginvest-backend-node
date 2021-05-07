import { Investimentos } from "../../domain/usecases/investimentos.js"
import { capturaErro } from "../servicos/capturaerro.js"

async function investimentosTotais(request, response) {
    const idUser = request.idUsuarioLogado
    
    const inv = new Investimentos()
    let investimentos = null

    try {
        investimentos = await inv.totalizaInvestimentos(idUser)
    } catch (error) {
        return response.status(500).send("Erro Interno: " + capturaErro(error))
    }    

    return response.status(200).json(investimentos)
}

export { investimentosTotais }