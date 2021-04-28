import { verificaGinvestToken } from "../servicos/token.js"

// Vai verificar se no request veio um token de autenticação,
// verificar se o token é válido. Se inválido retorna token inválido.
// Se válido extrai o usuário do token e coloca no request para a proxima 
// função possa usá-lo
function middlewareAuticacao(request, response, next) {
    console.log('Passou pelo Meddleware')

    const token = request.headers.authorization
    if (token === undefined || token === null || token === "") {
        console.log('Token Inexistente')
        response.status(401).send('Token Inexistente')
    }

    const decodedToken = verificaGinvestToken(token)
    if (decodedToken === null) {
        console.log('Token Inválido')
        response.status(401).send('Token Inválido')
    }

    request.idUsuarioLogado = decodedToken.sub
    next()
}

export { middlewareAuticacao }