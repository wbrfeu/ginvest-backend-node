import { dbClient } from './init-database.js'
import { EstoqueTD } from '../../domain/entities/tesourodireto.js'

class DaoMovimentoTD {

    async leEstoqueAtualTD(idUser) {

        const sql = `with a as (select id_user, id_corretora, cod_isin, data_negociacao, indicador_cv, id_lote, quantidade, valor_unitario,
                                        (case when indicador_cv = 'c' then quantidade else -quantidade end) as quant
                                from movimento_td where id_user = $1),
                          b as (select id_lote, sum(quant) as quant_liq from a group by id_lote)
                    select a.id_user, a.id_corretora, a.cod_isin, a.data_negociacao, b.id_lote, b.quant_liq, a.valor_unitario
                    from b inner join a on b.id_lote = a.id_lote
                    where b.quant_liq>0 and a.indicador_cv= 'c';`

        let result = null

        try {
            result = await dbClient.query(sql, [idUser])
        } catch (e) {
            console.log(`Erro ao Ler o Estoque TD: ${e}`)
            return null
        }

        let estoque = []

        // Converte o resultado da leitura do Banco de dados Movimento,
        // em um array de elementos do tipo EstoqueTD.

        for (let i = 0; i < result.rows.length; i++) {
            let r = result.rows[i]

            let est = new EstoqueTD(
                r.id_user,
                r.id_corretora,
                r.cod_isin,
                r.data_negociacao,
                r.id_lote,
                r.quant_liq,
                r.valor_unitario
            )

            estoque.push(est)
        }

        return estoque
    }

    async salvaNovaNotaNegociacao(novaNN) {
        const sql = `INSERT INTO movimento_td
            (id_user, numero_nota_negociacao, id_corretora, cod_isin, data_negociacao, indicador_cv, 
            id_lote, quantidade, valor_liquido, valor_unitario, data_compra_corresp, valor_unitario_compra_corresp, 
            result_bruto, result_bruto_percent, ir, result_liq, result_liq_percent, rent_liq_mensal_corresp)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);`

        for (let i = 0; i < novaNN.length; i++) {
            const nn = novaNN[i]

            let values = [
                nn.idUser,
                nn.numeroNotaNegociacao,
                nn.idCorretora,
                nn.codIsin,
                nn.dataNegociacao,
                nn.indicadorCV,
                nn.idLote,
                nn.quantidade,
                nn.valorLiquido,
                nn.valorUnitario,
                nn.dataCompraCorresp,
                nn.valorUnitarioCompraCorresp,
                nn.resultadoBruto,
                nn.resultadoBrutoPercent,
                nn.ir,
                nn.resultadoLiquido,
                nn.resultadoLiquidoPercent,
                nn.rentabLiqMensalCorresp
            ]

            await dbClient.query(sql, values)
        }
    }
}

export { DaoMovimentoTD }
