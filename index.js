import {inicializaBackend} from './infra/start.js'
import { Database } from './infra/database/database.js' // TODO - Somente um teste APAGAR

inicializaBackend()
    .then(async () => {
        console.log(`Sistema ${process.env.APP_NAME} Inicializado`) 
        let db = new Database()
        let recebe = await db.leEstoqueAtualTD()
        console.log(recebe)
    })
    .catch((e) => { console.error(`Erro ao Inicializar Sistema - ${e}`) })

