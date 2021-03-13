import { dbClient } from './start-database.js'
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
            let r = result.rows[i];

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


    salvaNovaNotaNegociacao(novaNN) { }


}

export { Database }
