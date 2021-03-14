import { convertToDate } from '../tools/conversores.js'

class MovimentoTD {
    constructor(user, numNotaNegoc, corret, isin, dtnegoc, cv, lote, quant, vlliq) {
        this.idUser = user
        this.numeroNotaNegociacao = numNotaNegoc
        this.idCorretora = corret
        this.codIsin = isin
        this.dataNegociacao = convertToDate(dtnegoc)
        this.indicadorCV = cv.toLowerCase()
        this.idLote = lote
        this.quantidade = quant
        this.valorLiquido = vlliq
        this.valorUnitario = vlliq/quant
        this.dataCompraCorresp = null
        this.valorUnitarioCompraCorresp = null
    }
}

class EstoqueTD {
    constructor(user, corret, isin, dtnegoc, lote, quant, valorunit) {
        this.idUser = user
        this.idCorretora = corret
        this.codIsin = isin
        this.dataNegociacao = dtnegoc
        this.idLote = lote
        this.quantidade = quant
        this.valorUnitario = valorunit
    }
}

export { MovimentoTD, EstoqueTD }