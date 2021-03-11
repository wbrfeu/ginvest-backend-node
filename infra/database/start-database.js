import pg from 'pg'

var dbClient = null

async function inicializaDatabase() {
    const { Client } = pg

    // Pega as informações do banco de variáveis de ambiente
    dbClient = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        await dbClient.connect()    
    } catch (error) {
        let msg = "Erro de Inicialização do Banco de Dados - " + error
        console.error(msg)
        throw msg
    }
}

export { dbClient, inicializaDatabase }

