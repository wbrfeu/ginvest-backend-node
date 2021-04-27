import { inicializaInfra } from '../../infra/init-infra.js'
import { geraGinvestToken } from '../../infra/servicos/token.js'

async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        console.log(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    const token = geraGinvestToken("b4b13a4a-43a2-45dd-a748-d041701291fa")

    console.log('Resultado da geração de token')
    console.log(token)

}

main()