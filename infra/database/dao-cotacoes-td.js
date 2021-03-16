import { dbClient } from './init-database.js'

class DaoCotacoesTD {

    async leDataUltimAtualizacao() {

        const sql = 'select atualizado_em from cotacoes_td limit 1;'

        let result = null

        try {
            result = await dbClient.query(sql)
        } catch (e) {
            console.log(`Erro ao Ler a Data da última Atualização da Tab Cotações_TD: ${e}`)
            return null
        }

        return result.rows[0].atualizado_em

    }
}

export { DaoCotacoesTD }