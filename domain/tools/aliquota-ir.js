import { convertToDate } from './conversores.js'

// TODO - Ver alíquotas e Períodos corretos na legislação

function aliquotaIR(dataCompra, dataVenda) {
    dataCompra = convertToDate(dataCompra)
    dataVenda = convertToDate(dataVenda)
    const diasCorridos = Math.abs(dataVenda - dataCompra) / (1000 * 60 * 60 * 24)

    if(diasCorridos <= 180) { return 0.225 }
    if(diasCorridos > 180 && diasCorridos <= 365) { return 0.2 }
    if(diasCorridos > 365 && diasCorridos <= 720) { return 0.175 }
    if(diasCorridos > 720) { return 0.15 }
}

export { aliquotaIR }
