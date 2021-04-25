import { logger } from '../logger/logger.js'
import { dbClient } from './init-database.js'

class DaoUsuarios {
    async leUsuario(email) {
        const sql = 'select * from usuarios where email = $1 limit 1;'
        let result = null

        try {
            result = await dbClient.query(sql, [email])
        } catch (e) {
            logger.error(`Erro ao Ler o Usuário da tabela de usuários: ${e}`)
            return null
        }

        if (result.rows[0] != undefined) {
            return result.rows[0]
        }

        return null
    }

    async salvaUsuario(usuario) {
        const sql = `INSERT INTO usuarios (id_usuario, nome, sobrenome, email) VALUES($1, $2, $3, $4);`
        let values = [usuario.id_usuario, usuario.nome, usuario.sobrenome, usuario.email]
        await dbClient.query(sql, values)
    }
}

export { DaoUsuarios }