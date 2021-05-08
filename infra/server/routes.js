import { root, status } from '../api/geral.js'
import { investimentosTotais } from '../api/invest-totais.js'
import { loginGoogle } from '../api/login.js'
import { middlewareAutenticacao } from '../api/middleware-autenticacao.js'
import { novaNotaNegocTD } from '../api/nova-nota-negoc-td.js'
import { tabelasUteis } from '../api/tabelas-uteis.js'

// TODO - Apagar todos o consoles inúteis

function inicializaRotas(server) {
    // Rotas gerais
    server.get("/", root)
    server.get("/status", status)
    server.get("/tabelasuteis", middlewareAutenticacao, tabelasUteis)

    // Endpoint que é chamado pelo Frontend axios
    server.post("/login/google", loginGoogle)

    // Rotas de Tesouro Direto
    server.get("/investimentos", middlewareAutenticacao, investimentosTotais)
    server.post("/td/novann", middlewareAutenticacao, novaNotaNegocTD)
}

export { inicializaRotas }