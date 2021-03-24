import axios from 'axios'
import https from 'https'
import { CotacaoTD } from '../../domain/entities/tesourodireto.js'
import { logger } from '../logger/logger.js'

const URL_TD = 'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json'

class ApiTesouroDireto {

    async leApiTD() {
        try {
            const httpsAgent = new https.Agent({ rejectUnauthorized: false })

            const resp = await axios.get(URL_TD, { httpsAgent })

            const listaTD = resp.data.response.TrsrBdTradgList

            // Converte a resposta para um formato da entidade Cotação TD:
            const listaCotacoesTD = []

            for (let i = 0; i < listaTD.length; i++) {
                const td = listaTD[i];
                const cot = new CotacaoTD(td.TrsrBd.nm, td.TrsrBd.isinCd, td.TrsrBd.untrRedVal, td.TrsrBd.mtrtyDt)
                listaCotacoesTD.push(cot)
            }

            return listaCotacoesTD

        } catch (e) {
            logger.error(`Erro ao Ler a API do site TD: ${e}`)
            return null
        }
    }
}

export { ApiTesouroDireto }