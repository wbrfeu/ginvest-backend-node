// Função para atender Endpoint '/' necessário ao Kubernetes
function Root(req, res) {
    return res.send()
}

function Status(req, res) {
    const obj = {
        mensagem: "Servidor está online",
        timestamp: new Date()
    }
    return res.json(obj)
}

export { Root, Status }