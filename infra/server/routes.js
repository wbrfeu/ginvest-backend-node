import { root, status } from '../api/geral.js'
import { investimentosTotais } from '../api/invest-totais.js'
import { loginGoogle } from '../api/login.js'

function inicializaRotas(server) {
    // Rotas gerais
    server.get("/", root)
    server.get("/status", status)
    server.post("/login/google", loginGoogle)

    // Rotas de Tesouro Direto
    server.get("/investimentos/totais", investimentosTotais)
}

export { inicializaRotas }