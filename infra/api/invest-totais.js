import { Investimentos } from "../../domain/usecases/investimentos.js"

async function investimentosTotais(request, response) {
    const idUser = request.idUsuarioLogado
    
    const inv = new Investimentos()
    const investimentos = await inv.totalizaInvestimentos(idUser)

    return response.status(200).json(investimentos)
}

export { investimentosTotais }