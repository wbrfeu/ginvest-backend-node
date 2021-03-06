import { v4 as uuidv4 } from 'uuid'
import { DaoMovimentoTD } from '../../infra/database/dao-movimento-td.js'
import { logger } from '../../infra/logger/logger.js'
import { MovimentoTD } from '../entities/tesourodireto.js'
import { CotacoesTesouroDireto } from './cotacoes-td.js'

class ProcessaTesouroDireto {    
    async processaESalvaNovaNotaNegociacao(novaNN, idUser) {
        const nnProcessada = await this.processaNovaNotaNegociacao(novaNN, idUser)

        const daoMov = new DaoMovimentoTD()
        await daoMov.salvaNovaNotaNegociacao(nnProcessada)
    }

    async processaNovaNotaNegociacao(novaNN, idUser) {
        const daoMov = new DaoMovimentoTD()
        const estoqueAtual = await daoMov.leEstoqueAtualTD(idUser)
        const estoqueOrdenado = this.ordenaEstoquePorData(estoqueAtual)
        const nnProcessada = []

        for (let i = 0; i < novaNN.length; i++) {
            const itemNN = novaNN[i];

            if (itemNN.indicadorCV === "c" && itemNN.idUser === idUser) {
                // Simplesmente adiciona na nota processada como veio
                itemNN.idLote = uuidv4()
                nnProcessada.push(itemNN)
            }
            else if (itemNN.indicadorCV === "v" && itemNN.idUser === idUser) {
                let saldoAVenderNN = itemNN.quantidade

                for (let j = 0; j < estoqueOrdenado.length; j++) {
                    const itemEst = estoqueOrdenado[j];

                    if (itemNN.codIsin === itemEst.codIsin && itemNN.idCorretora === itemEst.idCorretora && itemEst.dataNegociacao < itemNN.dataNegociacao) {
                        const quantDisponivelEst = itemEst.quantidade

                        if (quantDisponivelEst >= saldoAVenderNN) {
                            // o item do estoque consegue consumir todo o saldo a vender
                            const novoItem = new MovimentoTD(
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
                            novoItem.dataCompraCorresp = itemEst.dataNegociacao
                            novoItem.valorUnitarioCompraCorresp = itemEst.valorUnitario

                            itemEst.quantidade = itemEst.quantidade - saldoAVenderNN
                            saldoAVenderNN = 0
                            nnProcessada.push(novoItem)
                        }
                        else {
                            // só dá para consumir parcialmente o saldo a vender
                            // e vai ter que passar para os próximos item do estoque
                            const novoItem = new MovimentoTD(
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
                            novoItem.dataCompraCorresp = itemEst.dataNegociacao
                            novoItem.valorUnitarioCompraCorresp = itemEst.valorUnitario

                            saldoAVenderNN = saldoAVenderNN - itemEst.quantidade
                            itemEst.quantidade = 0
                            nnProcessada.push(novoItem)
                        }

                        // Se conseguiu consumir toda a quantidade pretendida na venda, encerra a procura
                        if (saldoAVenderNN === 0) {
                            break
                        }
                    }
                }

                if (saldoAVenderNN > 0) {
                    const msg = `Saldo insuficiente para venda do título ${itemNN.codIsin}. Nota não processada!`
                    logger.error(msg)
                    throw new Error(msg)
                }
            }
        }

        // Faz o cálculo de Resultados no caso das Vendas
        nnProcessada.forEach(itemNN => {
            itemNN.calculaResultado()
        })

        return nnProcessada
    }

    // Lê o Estoque e as Cotações Atuais e junta em uma única lista
    async leEstoqueComCotacoesAtuais(idUser) {
        const daoMov = new DaoMovimentoTD()
        const estoqueAtual = await daoMov.leEstoqueAtualTD(idUser)

        if (estoqueAtual === null || estoqueAtual.length === 0) { return [] }

        const cottd = new CotacoesTesouroDireto()
        const cotacoes = await cottd.leCotacoesAtuais()

        if (cotacoes === null) { return estoqueAtual }

        for (let i = 0; i < estoqueAtual.length; i++) {
            const est = estoqueAtual[i];

            for (let j = 0; j < cotacoes.length; j++) {
                const cot = cotacoes[j];

                if (est.codIsin === cot.codIsin) {
                    est.valorUnitarioAtualVenda = cot.valorUnitarioVenda
                    est.nome = cot.nome
                    est.calculaResultado()
                    break
                }
            }
        }

        return estoqueAtual
    }

    ordenaEstoquePorData(estoque) {
        const estoqueOrdenado = estoque.sort((a, b) => a.dataNegociacao - b.dataNegociacao)
        return estoqueOrdenado
    }
}

export { ProcessaTesouroDireto }
