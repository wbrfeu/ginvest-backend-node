// Função para atender Endpoint '/' necessário ao Kubernetes
function root(req, res) {
    return res.send()
}

function status(req, res) {
    const obj = {
        mensagem: "Servidor está online",
        timestamp: new Date()
    }
    return res.json(obj)
}

export { root, status }