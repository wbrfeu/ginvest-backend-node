// Junção de Todos os Usecases para compor total de investimentos de um usuário

import { ProcessaTesouroDireto } from './tesourodireto.js'

class Investimentos {

    async totalizaInvestimentos(idUser) {
        // Pega os totais de TD
        const td = new ProcessaTesouroDireto()
        const estoquetd = await td.leEstoqueComCotacoesAtuais(idUser)

        // Pega os totais de ações
        const estoqueAcoes = []

        // Pega os totais de FII
        const estoqueFII = []

        // Pega os totais de títulos privados
        const estoqueTitulosPrivados = []

        const investimentos = {
            td: estoquetd,
            acoes: estoqueAcoes,
            fii: estoqueFII,
            tit_priv: estoqueTitulosPrivados
        }

        return investimentos
    }
}

export { Investimentos }