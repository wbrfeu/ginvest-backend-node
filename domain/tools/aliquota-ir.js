import { diferencaEmDias } from "./datas.js"

function aliquotaIR(dataCompra, dataVenda) {
    const diasCorridos = diferencaEmDias(dataCompra, dataVenda)

    // TODO - Ver alíquotas e Períodos corretos na legislação
    if (diasCorridos <= 180) { return 0.225 }
    if (diasCorridos > 180 && diasCorridos <= 360) { return 0.2 }
    if (diasCorridos > 360 && diasCorridos <= 720) { return 0.175 }
    if (diasCorridos > 720) { return 0.15 }
}

export { aliquotaIR }
