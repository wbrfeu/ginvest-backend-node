import dotenv from 'dotenv'

function inicializaVariaveisAmbiente() {
    dotenv.config()

    let temErro = false

    if (process.env.DB_HOST === undefined) {
        console.error("Variável de Ambiente não Definida: DB_HOST")
        temErro = true
    }

    if (process.env.DB_PORT === undefined) {
        console.error("Variável de Ambiente não Definida: DB_PORT")
        temErro = true
    }

    if (process.env.DB_USER === undefined) {
        console.error("Variável de Ambiente não Definida: DB_USER")
        temErro = true
    }

    if (process.env.DB_PASSWORD === undefined) {
        console.error("Variável de Ambiente não Definida: DB_PASSWORD")
        temErro = true
    }

    if (process.env.DB_NAME === undefined) {
        console.error("Variável de Ambiente não Definida: DB_NAME")
        temErro = true
    }

    if (temErro === true) {
        throw "Variáveis de Ambiente Obrigatórias não Definidas"
    }
}

export { inicializaVariaveisAmbiente }

