import { inicializaInfra } from './infra/init-infra.js'
import { logger } from './infra/logger/logger.js'

async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        logger.fatal(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    logger.info(`Sistema ${process.env.APP_NAME} Inicializado com Sucesso`)

}

main()