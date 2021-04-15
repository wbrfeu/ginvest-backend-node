function loginGoogle(req, res) {
    const body = req.body
    console.log(body)

    // TODO - enviar o code para o Google e terminar o login

    // TODO - gerar um token interno ao backend e retornar para o frontend
    const resultado = {
        nome: "Walter",
        token: "12345"
    }
    return res.json(resultado)
}

export { loginGoogle }