import { CotacoesTesouroDireto } from "../../domain/usecases/cotacoes-td.js"
import { capturaErro } from "../servicos/capturaerro.js"

async function tabelasUteis(request, response) {
    let tabelasuteis = null

    // TODO - Criar Dao e Tabela Elephant para as Corretoras
    const listaCorretoras = [
        { idCorretora: "easy", nome: "Easynvest" },
        { idCorretora: "clear", nome: "Clear" },
        { idCorretora: "xp", nome: "XP"}
    ]


    try {
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

    console.log(listaTD)

    return []
}

export { tabelasUteis }