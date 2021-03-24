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
        this.valorLiquido = vlliq            // Valor real (retirados os custos) da Operação de Compra/Venda na NN
        this.valorUnitario = vlliq / quant
        this.dataCompraCorresp = null        // Só é preenchido quando é uma Venda
        this.valorUnitarioCompraCorresp = null // Lançado durante a venda
        this.resultadoBruto = null
        this.resultadoBrutoPercent = null
        this.ir = null
        this.resultadoLiquido = null
        this.resultadoLiquidoPercent = null
        this.rentabLiqMensalCorresp = null
    }

    calculaResultado() {
        if (this.indicadorCV === 'c') { return }
        this.resultadoBruto = (this.valorUnitario - this.valorUnitarioCompraCorresp) * this.quantidade
        this.resultadoBrutoPercent = (this.resultadoBruto * 100) / (this.valorUnitarioCompraCorresp * this.quantidade)
        this.ir = this.resultadoBruto * aliquotaIR(this.dataCompraCorresp, this.dataNegociacao)
        this.resultadoLiquido = this.resultadoBruto - this.ir
        this.resultadoLiquidoPercent = (this.resultadoLiquido * 100) / (this.valorUnitarioCompraCorresp * this.quantidade)

        const dias = diferencaEmDias(this.dataCompraCorresp, this.dataNegociacao)
        this.rentabLiqMensalCorresp = (Math.pow((1 + this.resultadoLiquidoPercent / 100), (30 / dias)) - 1) * 100
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