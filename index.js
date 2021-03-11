import {inicializaBackend} from './infra/start.js'

inicializaBackend()
    .then(() => { console.log(`Sistema ${process.env.APP_NAME} Inicializado`) })
    .catch((e) => { console.error(`Erro ao Inicializar Sistema - ${e}`) })

