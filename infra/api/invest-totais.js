import { Investimentos } from "../../domain/usecases/investimentos.js"

async function investimentosTotais(req, res) {
    const idUser = "M" // Simula qual usuário está logado - TODO - IDuser será extraído da "req"
    
    const inv = new Investimentos()
    const investimentos = await inv.totalizaInvestimentos(idUser)

    return res.json(investimentos)
}

export { investimentosTotais }