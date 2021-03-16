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

        if() {} // TODO - implementar regras de horário comercial


    }
}

export { CotacoesTesouroDireto }