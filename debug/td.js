import { Database } from '../infra/database/database.js'
import { ProcessaTesouroDireto } from '../domain/usecases/tesourodireto.js'
import { MovimentoTD } from '../domain/entities/tesourodireto.js'

var db = new Database()
let td = new ProcessaTesouroDireto()
td.setDatabase(db)

// Cria uma nova NN para processar e salvar no banco de dados
let novaNN = []
let td10 = new MovimentoTD("M", 10, "Easy", "LFT25", "10/02/2021", "C", null, 100, 1400)
let td20 = new MovimentoTD("M", 10, "Easy", "LFT25", "04/02/2021", "V", null, 120, 1800)
novaNN.push(td10)
novaNN.push(td20)

// let nnProcessada = td.processaNovaNotaNegociacao(novaNN)
// console.log(nnProcessada)

td.processaESalvaNovaNotaNegociacao(novaNN)
console.log(db)
