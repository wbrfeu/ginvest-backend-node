import { urlGoogleAuthorization } from '../../constantes/urls.js'
import axios from 'axios'
import https from 'https'

async function loginGoogle(req, res) {
    const body = req.body
    console.log('Code Recebido ->')
    console.log(body.code)

    // TODO - verificar se o code existe antes de executar o trecho abaixo
    const requestOptions = {
        url: urlGoogleAuthorization,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        data: `code=${body.code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
    }

    try {
        // TODO - Testar se o status da resposta é =200 antes de retornar o result
        const result = await axios(requestOptions)
        console.log(result.data.id_token)

        // TODO - Decodificar o id_token com uma biblioteca JWT
        
        //return result.data
    } catch (error) {
        throw new Error("Service Login Error: " + error.message)
    }

    // TODO - gerar um token interno ao backend e retornar para o frontend
    const resultado = {
        nome: "Walter",
        token: "12345"
    }
    return res.json(resultado)
}

export { loginGoogle }