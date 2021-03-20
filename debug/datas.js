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


// testaData("6/3/2021", null) // true - pois o banco está vazio
// testaData("10/3/2021", "11/3/2021") // true - dias diferentes
// testaData("6/3/2021", "7/3/2021") // true - embora ambos sejam sabado e domingo
// testaData("7/3/2021", "7/3/2021") // false - domingo
// testaData("6/3/2021", "6/3/2021") // false - sabado, enbora esteja no mesmo dia




let agora = null
let ultatual = null

// false - mesmo dia porém antes das nove horas
// agora = new Date(2021, 0, 1, 6, 15)
// ultatual = new Date(2021, 0, 1, 4, 15)
// testaData(agora, ultatual)

/*
// true - OK
agora = new Date(2021, 0, 1, 9, 15)
ultatual = new Date(2021, 0, 1, 4, 15)
testaData(agora, ultatual)

// false - não passaram 2h
agora = new Date(2021, 0, 1, 10, 15)
ultatual = new Date(2021, 0, 1, 9, 15)
testaData(agora, ultatual)

// true - primeira leitura dentro do horário comercial
agora = new Date(2021, 0, 1, 9, 15)
ultatual = new Date(2021, 0, 1, 8, 50)
testaData(agora, ultatual)

// false - não passou 2h
agora = new Date(2021, 0, 1, 9, 15)
ultatual = new Date(2021, 0, 1, 9, 5)
testaData(agora, ultatual)

// true - passaram mais de 2h após a ultima leitura
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

*/