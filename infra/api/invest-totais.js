import { Investimentos } from "../../domain/usecases/investimentos.js"
import { verificaGinvestToken } from '../servicos/token.js'

async function investimentosTotais(request, response) {
    console.log('Entrou na Rota  ' + request.idUsuarioLogado)
    const idUser = request.idUsuarioLogado
    
    const inv = new Investimentos()
    const investimentos = await inv.totalizaInvestimentos(idUser)

    return response.status(200).json(investimentos)
}

export { investimentosTotais }