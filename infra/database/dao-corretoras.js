import { dbClient } from './init-database.js'

class DaoCorretoras {
    async leCorretoras() {
        const sql = `SELECT nome, cod_corretora FROM corretoras;`
        let result = null

        try {
            result = await dbClient.query(sql)
        } catch (e) {
            logger.error(`Erro ao ler as Corretoras da Tab corretoras: ${e}`)
            return null
        }

        const listaCorretoras = []

        for (let i = 0; i < result.rows.length; i++) {
            const corret = result.rows[i]

            const item = {
                nome: corret.nome,
                idCorretora: corret.cod_corretora
            }

            listaCorretoras.push(item)
        }

        return listaCorretoras
    }
}

export { DaoCorretoras }