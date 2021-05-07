function excluiTitulosTDNaoPreenchidos(objNN) {

    for (let i = (objNN.titulos.length - 1); i >= 0; i--) {
        const tit = objNN.titulos[i]
        
        if (tit.codIsin === "" && tit.indicadorCV === "" && 
            tit.quantidade === "" && tit.valorLiquido === "") {
                objNN.titulos.splice(i, 1)
            }
    }
}

export { excluiTitulosTDNaoPreenchidos }