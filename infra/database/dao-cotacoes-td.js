import { CotacaoTD } from '../../domain/entities/tesourodireto.js'
import { logger } from '../logger/logger.js'
import { dbClient } from './init-database.js'

class DaoCotacoesTD {

    async leDataUltimAtualizacao() {
        const sql = 'select atualizado_em from cotacoes_td limit 1;'
        let result = null

        try {
            result = await dbClient.query(sql)
        } catch (e) {
            logger.error(`Erro ao Ler a Data da última Atualização da Tab Cotações_TD: ${e}`)
            return null
        }

        if (result.rows[0] != undefined) {
            return result.rows[0].atualizado_em
        }

        return null
    }

    async apagaCotacoes() {
        const sql = 'truncate cotacoes_td;'

        try {
            await dbClient.query(sql)
        } catch (e) {
            logger.error(`Erro ao Apagar as Cotações da Tab Cotações_TD: ${e}`)
        }
    }

    async salvaListaCotacoes(listaCotacoesTD) {
        const sql = `INSERT INTO cotacoes_td (nome, cod_isin, val_unit_venda, data_vencimento, atualizado_em) 
                        VALUES ($1, $2, $3, $4, $5);`

        for (let i = 0; i < listaCotacoesTD.length; i++) {
            const cot = listaCotacoesTD[i]

            let values = [
                cot.nome,
                cot.codIsin,
                cot.valorUnitarioVenda,
                cot.dataVencimento,
                cot.atualizadoEm
            ]

            await dbClient.query(sql, values)
        }
    }

    async leCotacoes() {
        const sql = `SELECT nome, cod_isin, val_unit_venda, data_vencimento FROM cotacoes_td;`
        let result = null

        try {
            result = await dbClient.query(sql)
        } catch (e) {
            logger.error(`Erro ao Ler as cotações da Tab Cotações_TD: ${e}`)
            return null
        }

        const listaCotacoesTD = []

        for (let i = 0; i < result.rows.length; i++) {
            const cot = result.rows[i]

            const item = new CotacaoTD(
                cot.nome,
                cot.cod_isin,
                cot.val_unit_venda,
                cot.data_vencimento
            )

            listaCotacoesTD.push(item)
        }

        return listaCotacoesTD
    }
}

export { DaoCotacoesTD }