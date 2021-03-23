import { aliquotaIR } from '../domain/tools/aliquota-ir.js'
import { convertToDate } from '../domain/tools/conversores.js'

// Teste com Diferença entre datas, resultado em dias - primeiro if
// const dc1 = convertToDate("01/03/2021")
// const dv1 = convertToDate("22/03/2021")
// const dif1 = aliquotaIR(dv1, dc1)
// console.log(dif1)

// Teste com Diferença entre datas, resultado em dias - segundo if
// const dc2 = convertToDate("01/01/2020")
// const dv2 = convertToDate("22/08/2020")
// const dif2 = aliquotaIR(dv2, dc2)
// console.log(dif2)

// Teste com Diferença entre datas, resultado em dias - terceiro if
// const dc3 = convertToDate("01/01/2020")
// const dv3 = convertToDate("22/02/2021")
// const dif3 = aliquotaIR(dv3, dc3)
// console.log(dif3)

// Teste com Diferença entre datas, resultado em dias - quarto if
const dc4 = convertToDate("01/01/2019")
const dv4 = convertToDate("22/02/2021")
const dif4 = aliquotaIR(dv4, dc4)
console.log(dif4)