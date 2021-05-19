import { CotacoesTesouroDireto } from "../../domain/usecases/cotacoes-td.js"
import { DaoCorretoras } from "../database/dao-corretoras.js"
import { capturaErro } from "../servicos/capturaerro.js"

async function tabelasUteis(request, response) {
    let tabelasuteis = null

    try {
        const listaCorretoras = await pegaListaCorretoras()

        const listaTD = await pegaListaTD()

        tabelasuteis = {
            corretoras: listaCorretoras,
            td: listaTD,
            acoes: null,
            fii: null,
            tit_priv: null
        }
    } catch (error) {
        return response.status(500).send("Erro Interno: " + capturaErro(error))
    }

    return response.status(200).json(tabelasuteis)
}

async function pegaListaTD() {
    const td = new CotacoesTesouroDireto()
    const listaTD = await td.leCotacoesAtuais()

    // Só estamos interessados em retornar o nome e codigo ISIN do título
    const listaTDAlterada = listaTD.map((t) => {
        return ({ nome: t.nome, codIsin: t.codIsin })
    })

    return listaTDAlterada
}

async function pegaListaCorretoras() {
    const dao = new DaoCorretoras()
    const listaCorretoras = dao.leCorretoras()

    return listaCorretoras
}

export { tabelasUteis }