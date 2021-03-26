import { Root, Status } from '../../api/api-geral.js'
import { LeEstoqueTD } from '../../api/api-td.js'

function inicializaRotas(server) {
    // Rotas gerais
    server.get("/", Root)
    server.get("/status", Status)

    // Rotas de Tesouro Direto
    server.get("/estoquetd", LeEstoqueTD)
}

export { inicializaRotas }