/*
Objeto que fornece as cotações Atuais do TD
    Características:
    - Vamos criar uma tabela de cotações que vai servir para alimentar os pedidos de cotação
    do Frontend. 
    - Vai ser criada um Cache das cotações para melhorar a performance e evitar multiplas
    leituras seguidas dos Banco e da API.
    - Esta tabela vai alimentar o estoque atual para calcular rentabilidade do estoque. 
    Sequência de Busca das Cotações:
    1o - Cache
    2o - API TD ou Banco. O que estiver mais atualizado.
    3o - Se tudo falhar, retorna o que estiver na cache independente do que esteja.

    Para o 2o passo verificar as regras que estão implementadas na função "eNecessarioLerApiTD()"  
*/

import { ApiTesouroDireto } from "../../infra/apis-externas/api-td.js"
import { DaoCotacoesTD } from "../../infra/database/dao-cotacoes-td.js"
import { logger } from "../../infra/logger/logger.js"

class CotacoesTesouroDireto {

    // Variáveis para controle de Cache
    dataUltimaAtualizacaoCache = null
    cacheListaCotacoesTD = null

    // Esse é o método que vai ser chamado pelo usecases, os demais são apenas acessórios
    async leCotacoesAtuais() {
        const agora = new Date()

        // Se existe algo na cache retorna a mesma
        if (this.dataUltimaAtualizacaoCache != null) {
            // Verifica se é necessário atualizar a Cache ante de retorná-la
            if (this.eNecessarioLerApiTD(agora, this.dataUltimaAtualizacaoCache) === true) {
                await this.leApiSalvaBancoESalvaCache()
            }

            // Só retorna se tem alguma coisa na Cache, se a leitua da API não falhou
            if (this.cacheListaCotacoesTD != null && this.cacheListaCotacoesTD.length > 0) {
                return this.cacheListaCotacoesTD
            }
        }

        // Se a Cache está vazia vê se precisa ler a API e atualiza o banco e a Cache
        const dao = new DaoCotacoesTD()
        const dataUltimaAtualizacaoNoBD = await dao.leDataUltimAtualizacao()

        let listaCotacoesTD = null

        if (this.eNecessarioLerApiTD(agora, dataUltimaAtualizacaoNoBD) === true) {
            await this.leApiSalvaBancoESalvaCache()

            // Só retorna se tem alguma coisa na Cache, se a leitua da API não falhou
            // Após a leitura anterior o cache estará atualizado 
            if (this.cacheListaCotacoesTD != null && this.cacheListaCotacoesTD.length > 0) {
                return this.cacheListaCotacoesTD
            }
        }

        // Lê as cotações do Banco e atualiza a cache
        listaCotacoesTD = await dao.leCotacoes()
        this.dataUltimaAtualizacaoCache = dataUltimaAtualizacaoNoBD
        this.cacheListaCotacoesTD = listaCotacoesTD
        if (listaCotacoesTD != null && listaCotacoesTD.length > 0) {
            return listaCotacoesTD
        }

        // Se todas as opções falharem retorna o que está na cache, independente do conteúdo
        logger.info("Não foi possível obter as cotações atuais de TD, pois as 3 fontes falharam: Cache, API e BD")
        return this.cacheListaCotacoesTD
    }

    eNecessarioLerApiTD(agora, ultimaAtualizacao) {
        // Se o banco está vazio precisa ler a API
        if (ultimaAtualizacao === null) { return true }

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
        const tempoMinAcessarApi = 2 // tempo em horas

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

    async leApiSalvaBancoESalvaCache() {
        const api = new ApiTesouroDireto()
        const listaCotacoesTD = await api.leApiTD()

        if (listaCotacoesTD != null && listaCotacoesTD.length > 0) {
            // Salva no Banco Tesouro
            const dao = new DaoCotacoesTD()
            await dao.apagaCotacoes()
            await dao.salvaListaCotacoes(listaCotacoesTD)
            // Salva no Cache
            this.dataUltimaAtualizacaoCache = new Date()
            this.cacheListaCotacoesTD = listaCotacoesTD
        }
    }
}

export { CotacoesTesouroDireto }