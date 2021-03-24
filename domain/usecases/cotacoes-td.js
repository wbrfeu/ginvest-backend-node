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
import { DaoCotacoesTD } from "../../infra/database/dao-cotacoes-td.js"

class CotacoesTesouroDireto {

    // Vai ser chamado pelo usecases - APAGAR
    async leCotacoesAtuais() {
        const agora = new Date()

        const dao = new DaoCotacoesTD()
        const ultimaAtualizacao = await dao.leDataUltimAtualizacao()

        let listaCotacoesTD = null

        if (this.eNecessarioLerApiTD(agora, ultimaAtualizacao) === true) {
            // TODO - Tratar o erro caso a API falhe
            const api = new ApiTesouroDireto()
            listaCotacoesTD = await api.leApiTD()
            await dao.apagaCotacoes()
            await dao.salvaListaCotacoes(listaCotacoesTD)
            return listaCotacoesTD
        }

        // TODO - Tratar o erro caso o banco falhe
        listaCotacoesTD = await dao.leCotacoes()
        return listaCotacoesTD
    }

    eNecessarioLerApiTD(agora, ultimaAtualizacao) {
        // Se o banco está vazio precisa ler a API
        if(ultimaAtualizacao === null) { return true }

        // Se o dia é diferente então tem que ler a API do TD
        if (agora.getFullYear() != ultimaAtualizacao.getFullYear() ||
            agora.getMonth() != ultimaAtualizacao.getMonth() ||
            agora.getDate() != ultimaAtualizacao.getDate()) {
            return true
        }

        // Se o agora é sábado ou domingo não precisa ler a API
        if (agora.getDay() === 0 || agora.getDay() === 6) { return false }

        // Todos estes são o mesmo dia, verificar se é horário comercial

        // Constantes Horário Comercial relativos ao Tesouro Direto
        const horaInicioPregao = 9
        const horaFimPregao = 18
        const tempoMinAcessarApi = 2

        const horaLocal = agora.getHours()
        const horaUltimaAtualiz = ultimaAtualizacao.getHours()

        // Se é antes das 9h não precisa ler a API
        if (horaLocal < horaInicioPregao) { return false }

        // Se a hora local for >18h e a ultima atualização for >18h então dá false. NÃO Lê a API
        if (horaLocal >= horaFimPregao && horaUltimaAtualiz >= horaFimPregao) { return false }

        // Após o início do horário comercial deve existir pelo menos uma leitura
        if (horaLocal >= horaInicioPregao && horaUltimaAtualiz < horaInicioPregao) { return true }

        // Se a hora local for >18h e a ultima atualização for <18h e  dá true. Lê a API
        if (horaLocal >= horaFimPregao && horaUltimaAtualiz < horaFimPregao) { return true }

        // Se está no horário comercial porém tem menos de 3h que fez a atualização da tabela.
        // retorna false, não precisa ler a API
        const horasCorridas = (agora - ultimaAtualizacao) / (1000 * 60 * 60)
        if (horaLocal >= horaInicioPregao && horaUltimaAtualiz >= horaInicioPregao
            && horasCorridas >= tempoMinAcessarApi) { return true }

        return false
    }
}

export { CotacoesTesouroDireto }