import { Root, Status } from '../api/geral.js'
import { investimentosTotais } from '../api/invest-totais.js'

function inicializaRotas(server) {
    // Rotas gerais
    server.get("/", Root)
    server.get("/status", Status)

    // Rotas de Tesouro Direto
    server.get("/investimentos/totais", investimentosTotais)
}

export { inicializaRotas }