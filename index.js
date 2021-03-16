import { inicializaInfra } from './infra/init-infra.js'

async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        console.error(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    console.log(`Sistema ${process.env.APP_NAME} Inicializado`)

 
}

main()

// TODO - fazer loggs para o programa
