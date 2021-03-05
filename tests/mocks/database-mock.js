import { EstoqueTD, MovimentoTD } from '../../domain/entities/tesourodireto.js'

class DatabaseMock {
    movimentoTD = []

    constructor() {
        var td1 = new MovimentoTD("M", 1, "Easy", "LFT25", "1/2/2021", "c", "l1", 100, 1000)
        var td2 = new MovimentoTD("W", 2, "Easy", "LFT25", "2/2/2021", "c", "l2", 50, 500)
        var td3 = new MovimentoTD("M", 3, "Clear", "LTN35", "3/2/2021", "c", "l3", 50, 500)
        var td4 = new MovimentoTD("M", 4, "Easy", "LFT25", "4/2/2021", "c", "l4", 100, 1000)
        this.movimentoTD.push(td4)
        this.movimentoTD.push(td1)
        this.movimentoTD.push(td3)
        this.movimentoTD.push(td2)
    }

    leEstoqueAtualTesouroDireto() {
        // Este método está errado. Não é para retornar a tabela original, mas só o estoque atual.
        let estoque = []

        for (let i = 0; i < this.movimentoTD.length; i++) {
            const mov = this.movimentoTD[i];

            const est = new EstoqueTD(
                mov.idUser,
                mov.numeroNotaNegociacao,
                mov.idCorretora,
                mov.codIsin,
                mov.dataNegociacao,
                mov.idLote,
                mov.quantidade,
                mov.valorLiquido
            )

            estoque.push(est)
        }

        return estoque
    }

    salvaNovaNotaNegociacao(novaNN) {
        novaNN.forEach(item => this.movimentoTD.push(item))
    }
}

export { DatabaseMock }
