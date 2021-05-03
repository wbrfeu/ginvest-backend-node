import jwt from 'jsonwebtoken'

const tokenAudience = 'ginvest'

function geraGinvestToken(id_usuario) {
    const payload = {
        sub: id_usuario,
        aud: tokenAudience,
        exp: Date.now() + 3600 * 1000 * 2   // Expira em 2 horas
    }    

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

function verificaGinvestToken(token) {
    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }

    if (decoded.aud !== tokenAudience) {
        return null
    }

    if (decoded.exp <= Date.now()) {
        return null
    }
    
    return decoded
}

export { geraGinvestToken, verificaGinvestToken }