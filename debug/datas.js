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


// testaData("6/3/2021", "1/2/2021")
// testaData("7/3/2021", "1/2/2021")
// testaData("6/3/2021", "6/3/2021")
// testaData("10/3/2021", "11/3/2021")

let agora = null
let ultatual = null

// agora = new Date(2021, 0, 1, 6, 15)
// ultatual = new Date(2021, 0, 1, 4, 15)
// testaData(agora, ultatual)

// true - OK
agora = new Date(2021, 0, 1, 9, 15)
ultatual = new Date(2021, 0, 1, 4, 15)
testaData(agora, ultatual)

// false - não passaram 3h
agora = new Date(2021, 0, 1, 10, 15)
ultatual = new Date(2021, 0, 1, 9, 15)
testaData(agora, ultatual)

// true - primeira leitura dentro do horário comercial
agora = new Date(2021, 0, 1, 9, 15)
ultatual = new Date(2021, 0, 1, 8, 50)
testaData(agora, ultatual)

// false - não passou 3h
agora = new Date(2021, 0, 1, 9, 15)
ultatual = new Date(2021, 0, 1, 9, 5)
testaData(agora, ultatual)

// true - passaram mais de 3h após a ultima leitura
agora = new Date(2021, 0, 1, 13, 30)
ultatual = new Date(2021, 0, 1, 10, 20)
testaData(agora, ultatual)

// true - após o fechamento precisamos de uma leitura de fechamento
agora = new Date(2021, 0, 1, 18, 15)
ultatual = new Date(2021, 0, 1, 17, 40)
testaData(agora, ultatual)

// false
agora = new Date(2021, 0, 1, 21, 0)
ultatual = new Date(2021, 0, 1, 18, 7)
testaData(agora, ultatual)

// false
agora = new Date(2021, 0, 1, 21, 0)
ultatual = new Date(2021, 0, 1, 20, 0)
testaData(agora, ultatual)