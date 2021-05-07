import { validaNotaNegocTD } from '../../domain/usecases/validacao-nn-td.js'
import { excluiTitulosTDNaoPreenchidos } from '../../domain/usecases/exclui-tit-nao-preenc-td.js'

const objNN = {
    numeroNotaNegociacao: '',
    dataNegociacao: '1111111',
    idCorretora: 'nnn',
    titulos: [
        { codIsin: '', indicadorCV: '', quantidade: '', valorLiquido: '' },
        { codIsin: '', indicadorCV: '', quantidade: '', valorLiquido: '' }
    ]
}

console.log(objNN)
excluiTitulosTDNaoPreenchidos(objNN)
console.log('=======================')
console.log(objNN)
console.log('=======================')
console.log(validaNotaNegocTD(objNN))