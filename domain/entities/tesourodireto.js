import { aliquotaIR } from '../tools/aliquota-ir.js'
import { convertToDate } from '../tools/conversores.js'
import { diferencaEmDias } from '../tools/datas.js'


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
        this.valorUnitario = vlliq / quant
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
        this.valorUnitarioAtualVenda = null
        this.nome = null
        this.resultadoBruto = null
        this.resultadoBrutoPercent = null
        this.ir = null
        this.resultadoLiquido = null
        this.resultadoLiquidoPercent = null
        this.rentabLiqMensalCorresp = null
    }

    calculaResultado() {
        if (this.valorUnitarioAtualVenda === null) { return }
        this.resultadoBruto = (this.valorUnitarioAtualVenda - this.valorUnitario) * this.quantidade
        this.resultadoBrutoPercent = (this.resultadoBruto * 100) / (this.valorUnitario * this.quantidade)
        this.ir = this.resultadoBruto * aliquotaIR(this.dataNegociacao, new Date())
        this.resultadoLiquido = this.resultadoBruto - this.ir
        this.resultadoLiquidoPercent = (this.resultadoLiquido * 100) / (this.valorUnitario * this.quantidade)

        const dias = diferencaEmDias(this.dataNegociacao, new Date())
        this.rentabLiqMensalCorresp = (Math.pow((1 + this.resultadoLiquidoPercent / 100), (30 / dias)) - 1) * 100
    }

}

class CotacaoTD {
    constructor(nome, isin, valunitvenda, datavenc) {
        this.nome = nome
        this.codIsin = isin
        this.valorUnitarioVenda = valunitvenda
        this.dataVencimento = datavenc
        this.atualizadoEm = new Date()
    }
}

export { MovimentoTD, EstoqueTD, CotacaoTD }