// Junção de Todos os Usecases para compor total de investimentos de um usuário

import { ProcessaTesouroDireto } from './tesourodireto.js'

class Investimentos {

    async totalizaInvestimentos(idUser) {
        // Pega os totais de TD
        const td = new ProcessaTesouroDireto()
        const estoqueTD = await td.leEstoqueComCotacoesAtuais(idUser)
        let estoqueOrdenadoTD = []
        if (estoqueTD.length > 0) {
            estoqueOrdenadoTD = estoqueTD.sort((a, b) => a.dataNegociacao - b.dataNegociacao)
        }
        
        // Pega os totais de ações
        const estoqueAcoes = []
        // TODO - Fazer Ordenação por data

        // Pega os totais de FII
        const estoqueFII = []
        // TODO - Fazer Ordenação por data

        // Pega os totais de títulos privados
        const estoqueTitulosPrivados = []
        // TODO - Fazer Ordenação por data

        const investimentos = {
            td: estoqueOrdenadoTD,
            acoes: estoqueAcoes,
            fii: estoqueFII,
            tit_priv: estoqueTitulosPrivados
        }

        return investimentos
    }
}

export { Investimentos }