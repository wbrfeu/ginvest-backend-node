import { convertToDate } from './conversores.js'

function diferencaEmDias(data1, data2) {
    data1 = convertToDate(data1)
    data2 = convertToDate(data2)
    const dif = Math.trunc(Math.abs(data1 - data2) / (1000 * 60 * 60 * 24))
    return dif
}

export { diferencaEmDias }