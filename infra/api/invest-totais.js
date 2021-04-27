import { Investimentos } from "../../domain/usecases/investimentos.js"
import { verificaGinvestToken } from '../servicos/token.js'

async function investimentosTotais(request, response) {
    const token = request.headers.authorization
    const decoded = verificaGinvestToken(token)

    if (decoded === null) {
        response.status(401).send('Token Inválido')
    }

    const idUser = decoded.sub
    
    const inv = new Investimentos()
    const investimentos = await inv.totalizaInvestimentos(idUser)

    return response.status(200).json(investimentos)
}

export { investimentosTotais }