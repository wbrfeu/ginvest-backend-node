/*
Objeto que fornece as cotações Atuais do TD
    Características:
    - Vamos criar uma tabela de cotações que vai servir para alimentar os pedidos de cotação
    do Frontend. 
    - Esta tabela vai alimentar o estoque atual para calcular rentabilidade do estoque. Ela só 
    vai buscar cotações caso a tabela não tenha sido atualizada.
    - Casos de Atualização da tabela (Frontend pede estoque atulaizado):
        > data de hoje é maior do que a data da tabela;
        > data de hoje existe na tabela mas está no horário comercial e dia útil, está no
        horário comercial mas está com "N" horas de atraso.
    - Caso a API do tesouro não responda por qualquer motivo manter a tabela desetualizada.
    
    Algorítmo:
    - Busca data atual e compara com a data da última gravação no banco cotações TD.
    Se a diferença entre as duas datas 

*/

import { ApiTesouroDireto } from "../../infra/apis-externas/api-td.js"

class CotacoesTesouroDireto {

    async leCotacoesAtuais() {
        const agora = new Date()

        const dao = new DaoCotacoesTD()
        const ultimaAtualizacao = await dao.leDataUltimAtualizacao()



    }

    eNecessarioLerApiTD(agora, ultimaAtualizacao) {
        // Se o agora é sábado ou domingo não precisa ler a API
        if (agora.getDay() === 0 || agora.getDay() === 6) { return false }

        // Se o dia é diferente então tem que ler a API do TD
        if (agora.getFullYear() != ultimaAtualizacao.getFullYear() ||
            agora.getMonth() != ultimaAtualizacao.getMonth() ||
            agora.getDate() != ultimaAtualizacao.getDate()) {
            return true
        }

        //Todos estes são o mesmo dia, verificar se é horário comercial

        const horaLocal = agora.getHours()
        const horaUltimaAtualiz = ultimaAtualizacao.getHours()

        //Se é antes das 9h não precisa ler a API
        if (horaLocal < 9) { return false }

        // Se a hora local for >18h e a ultima atualização for >18h e dá false. NÃO Lê a API
        if (horaLocal >= 18 && horaUltimaAtualiz >= 18) { return false }

        // Após o início do horário comercial deve existir pelo menos uma leitura
        if (horaLocal >= 9 && horaUltimaAtualiz < 9) { return true }

        // Se a hora local for >18h e a ultima atualização for <18h e  dá true. Lê a API
        if (horaLocal >= 18 && horaUltimaAtualiz < 18) { return true }

        // Se está no horário comercial porém tem menos de 3h que fez a atualização da tabela.
        // retorna false, não precisa ler a API
        const tempoCorrido = (agora - ultimaAtualizacao) / (1000 * 60 * 60)
        console.log(tempoCorrido)
        if (horaLocal >= 9 && horaUltimaAtualiz >= 9 && tempoCorrido >= 2) { return true }

        return false
    }
}

export { CotacoesTesouroDireto }