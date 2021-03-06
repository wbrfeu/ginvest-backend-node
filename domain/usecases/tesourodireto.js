import { v4 as uuidv4 } from 'uuid'
import { MovimentoTD } from '../entities/tesourodireto.js'

class ProcessaTesouroDireto {
    db = null

    setDatabase(dbInstance) {
        this.db = dbInstance
    }

    ordenaEstoquePorData(estoque) {
        const estoqueOrdenado = estoque.sort((a, b) => a.dataNegociacao - b.dataNegociacao)
        return estoqueOrdenado
    }

    processaNovaNotaNegociacao(novaNN) {
        let estoqueAtual = this.db.leEstoqueAtualTD()
        let estoqueOrdenado = this.ordenaEstoquePorData(estoqueAtual)

        let nnProcessada = []

        for (let i = 0; i < novaNN.length; i++) {
            const itemNN = novaNN[i];

            if (itemNN.indicadorCV === "c") {
                itemNN.idLote = uuidv4()
                nnProcessada.push(itemNN)
            }
            else if (itemNN.indicadorCV === "v") {
                let saldoAVenderNN = itemNN.quantidade

                for (let j = 0; j < estoqueOrdenado.length; j++) {
                    const itemEst = estoqueOrdenado[j];

                    if (itemNN.idUser === itemEst.idUser && itemNN.codIsin === itemEst.codIsin && itemNN.idCorretora === itemEst.idCorretora) {

                        let quantDisponivelEst = itemEst.quantidade

                        if (quantDisponivelEst >= saldoAVenderNN) {
                            // o item do estoque consegue consumir todo o saldo a vender

                            let novoItem = new MovimentoTD(
                                itemNN.idUser,
                                itemNN.numeroNotaNegociacao,
                                itemNN.idCorretora,
                                itemNN.codIsin,
                                itemNN.dataNegociacao,
                                itemNN.indicadorCV,
                                itemEst.idLote,
                                saldoAVenderNN,
                                saldoAVenderNN * itemNN.valorUnitario
                            )

                            itemEst.quantidade = itemEst.quantidade - saldoAVenderNN
                            saldoAVenderNN = 0
                            nnProcessada.push(novoItem)
                        }
                        else {
                            // só dá para consumir parcialmente o saldo a vender
                            // e vai ter que passar para os próximos item do estoque

                            let novoItem = new MovimentoTD(
                                itemNN.idUser,
                                itemNN.numeroNotaNegociacao,
                                itemNN.idCorretora,
                                itemNN.codIsin,
                                itemNN.dataNegociacao,
                                itemNN.indicadorCV,
                                itemEst.idLote,
                                itemEst.quantidade,
                                itemEst.quantidade * itemNN.valorUnitario
                            )

                            saldoAVenderNN = saldoAVenderNN - itemEst.quantidade
                            itemEst.quantidade = 0
                            nnProcessada.push(novoItem)
                        }

                        if (saldoAVenderNN === 0) {
                            break
                        }

                    }
                }

                if (saldoAVenderNN > 0) {
                    console.log(`Saldo insuficiente para venda do título ${itemNN.codIsin}`)
                    return []
                }
            }
        }

        return nnProcessada
    }
}

export { ProcessaTesouroDireto }
