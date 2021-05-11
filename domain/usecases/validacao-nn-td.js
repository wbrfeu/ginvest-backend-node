// TODO - Verificar se a corretora recebida está na lista de corretoras cadastradas

import { convertToDate } from "../tools/conversores.js"
import moment from 'moment'

function validaNotaNegocTD(objNN) {
    // valida Data
    if (objNN.dataNegociacao === "") {
        return { status: false, descricao: "Data NÃO informada" }
    }

    const m = moment(objNN.dataNegociacao, 'D/M/YYYY', true)
    if (m.isValid() === false) {
        return { status: false, descricao: "Data Inválida" }
    }

    const dataNegoc = convertToDate(objNN.dataNegociacao)
    if (dataNegoc > new Date()) {
        return { status: false, descricao: "Data futura NÃO permitida" }
    }

    // valida Corretora
    if (objNN.idCorretora === "") {
        return { status: false, descricao: "Corretora Inválida" }
    }    

    // valida cada linha do título
    for (let i = 0; i < objNN.titulos.length; i++) {
        const tit = objNN.titulos[i]

        if (tit.codIsin === "") {
            return { status: false, descricao: "Título NÃO informado na linha " + (i+1) }
        }
        
        if (tit.indicadorCV === "") {
            return { status: false, descricao: "Compra/Venda NÃO informada na linha " + (i+1) }
        }

        const cv = tit.indicadorCV.toLowerCase()
        if (cv !== "c" && cv !== "v") {
            return { status: false, descricao: "Compra/Venda inválida na linha " + (i+1) }
        }

        if (tit.quantidade === "") {
            return { status: false, descricao: "Quantidade NÃO informada na linha " + (i+1) }
        }

        if (isNaN(parseFloat(tit.quantidade)) === true) {
            return { status: false, descricao: "Quantidade inválida na linha " + (i+1) }
        }

        if (tit.valorLiquido === "") {
            return { status: false, descricao: "Valor Líquido NÃO informado na linha " + (i+1) }
        }

        if (isNaN(parseFloat(tit.valorLiquido)) === true) {
            return { status: false, descricao: "Valor Líquido inválido na linha " + (i+1) }
        }
    }

    return { status: true, descricao: null }
}

export { validaNotaNegocTD }