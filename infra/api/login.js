import { urlGoogleAuthorization } from '../../constantes/urls.js'
import axios from 'axios'
import https from 'https'
import jwt from 'jsonwebtoken'
import { DaoUsuarios } from '../database/dao-usuarios.js'
import { v4 as uuidv4 } from 'uuid'

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
        console.log('ID token:')
        console.log(result.data.id_token)

        const googleTokenPayload = jwt.decode(result.data.id_token)
        console.log('Token Payload:')
        console.log(googleTokenPayload)

        // TODO - A partir do email retornado pega o usuario do banco ou cria o 
        // usuario inexistente
        const usuarioGoogle = {
            nome: googleTokenPayload.given_name,
            sobrenome: googleTokenPayload.family_name,
            email: googleTokenPayload.email
        }

        console.log('Usuario extraido do Google Token')
        console.log(usuarioGoogle)

        const usuarioBanco = await leOuCriaUsuario(usuarioGoogle)
        console.log('Usuario lido do Banco')
        console.log(usuarioBanco)

        // TODO - Se o usuario estiver bloqueado não faz login

        // TODO - Gerar o token do GInvest para enviar para o Frontend

        const ginvestToken = geraGinvestToken(usuarioBanco.id_usuario)

        const resultado = {
            nome: googleTokenPayload.given_name,
            token: ginvestToken
        }
        return res.json(resultado)

    } catch (error) {
        throw new Error("Service Login Error: " + error.message)
    }

    // TODO - gerar um token interno ao backend e retornar para o frontend
    
}

async function leOuCriaUsuario(usuario) {
    const dao = new DaoUsuarios()
    const usuarioBanco = await dao.leUsuario(usuario.email)
    
    if (usuarioBanco === null) {
        console.log('Usuario NÂO existe no Banco e será criado')
        usuario.id_usuario = uuidv4()
        console.log(usuario)
        dao.salvaUsuario(usuario)
        return usuario
    }
    console.log('Usuario existe')
    console.log(usuarioBanco)
    return usuarioBanco 
}

function geraGinvestToken(id_usuario) {
    return 'oijfsfjlodfjçfjdçfkljfslkfjasfjsolkjmfs_' + id_usuario
}

export { loginGoogle }