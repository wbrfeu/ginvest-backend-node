import { DaoUsuarios } from '../../infra/database/dao-usuarios.js'
import { inicializaInfra } from '../../infra/init-infra.js'

async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        console.log(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    console.log(`Sistema ${process.env.APP_NAME} Inicializado`)

    const dao = new DaoUsuarios()
    const result = await dao.leUsuario('wbrfeu@gmail.com')

    console.log('Resultado da busca de email')
    console.log(result)

}

main()