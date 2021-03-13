import { dbClient } from './init-database.js'
import { EstoqueTD } from '../../domain/entities/tesourodireto.js'

class Database {

    async leEstoqueAtualTD() {

        const sql = `SELECT iduser, numeronotanegociacao, idcorretora, codisin, datanegociacao, idlote, 
                    quantidade, valorliquido FROM movimentotd;`

        let result = null

        try {
            result = await dbClient.query(sql)
        } catch (e) {
            console.log(`Erro ao Ler o Estoque TD: ${e}`)
            return null
        }

        let estoque = []

        for (let i = 0; i < result.rows.length; i++) {
            let r = result.rows[i]

            let est = new EstoqueTD(
                r.iduser,
                r.numeronotanegociacao,
                r.idcorretora,
                r.codisin,
                r.datanegociacao,
                r.idlote,
                r.quantidade,
                r.valorliquido
            )

            estoque.push(est)
        }

        return estoque

    }


    async salvaNovaNotaNegociacao(novaNN) {

        for (let i = 0; i < novaNN.length; i++) {
            const nn = novaNN[i]

            const sql = `INSERT INTO movimentotd
            (iduser, numeronotanegociacao, idcorretora, codisin, datanegociacao, indicadorcv, 
            idlote, quantidade, valorliquido, valorunitario, datacompracorresp, valorunitariocompracorresp)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`

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
