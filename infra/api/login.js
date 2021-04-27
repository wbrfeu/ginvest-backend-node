import { urlGoogleAuthorization } from '../../constantes/urls.js'
import axios from 'axios'
import https from 'https'
import jwt from 'jsonwebtoken'
import { geraGinvestToken } from '../servicos/token.js'
import { leOuCriaUsuario } from '../servicos/usuarios.js'
import { capturaErro } from '../servicos/capturaerro.js'

async function loginGoogle(request, response) {
    const body = request.body

    if (body.error !== undefined) {
        return response.status(401).send("Erro de Autenticação do Google: " + body.error)
    }

    if (body.code === undefined) {
        return response.status(401).send("Erro de Autenticação do Google: Código Ausente")
    }

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
        const result = await axios(requestOptions)
        const googleTokenPayload = jwt.decode(result.data.id_token)

        // A partir do email retornado pega o usuario do banco ou cria o 
        // usuario caso seja inexistente - 401 Unauthorized
        const usuarioGoogle = {
            nome: googleTokenPayload.given_name,
            sobrenome: googleTokenPayload.family_name,
            email: googleTokenPayload.email
        }

        const usuarioBanco = await leOuCriaUsuario(usuarioGoogle)

        if (usuarioBanco.bloqueado === true) {
            return response.status(401).send("Erro de Autenticação: Usuário Bloqueado")
        }

        // Gera o token do GInvest e devolve para o Frontend (pelo response) 
        const ginvestToken = geraGinvestToken(usuarioBanco.id_usuario)
        const resultado = {
            nome: googleTokenPayload.given_name,
            token: ginvestToken
        }
        return response.status(200).json(resultado)

    } catch (error) {
        const msg = capturaErro(error)
        return response.status(500).send("Erro Interno: " + msg)
    }
}

export { loginGoogle }