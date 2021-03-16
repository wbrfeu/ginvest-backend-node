import { convertToDate } from '../domain/tools/conversores.js'
import { CotacoesTesouroDireto } from '../domain/usecases/cotacoes-td.js'

const cot = new CotacoesTesouroDireto()

function testaData(d1, d2) {
    const data1 = convertToDate(d1)
    const data2 = convertToDate(d2)
    console.log(`Data1: ${data1}`)
    console.log(`Data2: ${data2}`)
    console.log(`ler api: ${cot.eNecessarioLerApiTD(data1, data2)}\n`)
}


testaData("6/3/2021", "1/2/2021")
testaData("7/3/2021", "1/2/2021")
testaData("6/3/2021", "6/3/2021")
testaData("10/3/2021", "11/3/2021")


testaData("1/1/2021", "1/1/2021")