import { dbClient } from './init-database.js'
import { EstoqueTD } from '../../domain/entities/tesourodireto.js'

class Database {

    async leEstoqueAtualTD(idUser) {

        const sql = `with a as (select iduser, idcorretora, codisin, datanegociacao, indicadorcv, idlote, quantidade, valorunitario,
                                        (case when indicadorcv = 'c' then quantidade else -quantidade end) as quant
                                from movimentotd where iduser = $1),
                          b as (select idlote, sum(quant) as quantliq from a group by idlote)
                    select a.iduser, a.idcorretora, a.codisin, a.datanegociacao, b.idlote, b.quantliq, a.valorunitario
                    from b inner join a on b.idlote = a.idlote
                    where b.quantliq>0 and a.indicadorcv= 'c';`

        let result = null

        try {
            result = await dbClient.query(sql, [idUser])
        } catch (e) {
            console.log(`Erro ao Ler o Estoque TD: ${e}`)
            return null
        }

        let estoque = []

        for (let i = 0; i < result.rows.length; i++) {
            let r = result.rows[i]

            let est = new EstoqueTD(
                r.iduser,
                r.idcorretora,
                r.codisin,
                r.datanegociacao,
                r.idlote,
                r.quantliq,
                r.valorunitario
            )

            estoque.push(est)
        }

        return estoque

    }

    async salvaNovaNotaNegociacao(novaNN) {
        const sql = `INSERT INTO movimentotd
            (iduser, numeronotanegociacao, idcorretora, codisin, datanegociacao, indicadorcv, 
            idlote, quantidade, valorliquido, valorunitario, datacompracorresp, valorunitariocompracorresp)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`

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
                nn.valorUnitarioCompraCorresp
            ]

            await dbClient.query(sql, values)
        }
    }
}

export { Database }
