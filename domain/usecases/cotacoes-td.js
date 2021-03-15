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

*/


class CotacoesTesouroDireto {

    leCotacoesAtuais(listaCodIsin) {}

    async leApiTD() {
        try {
            const httpsAgent = new https.Agent({ rejectUnauthorized: false })
    
            const resp = await axios.get(
                'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json',
                { httpsAgent }
            )
    
            const listaTD = resp.data.response.TrsrBdTradgList
    
            for (let i = 0; i < listaTD.length; i++) {
                const td = listaTD[i];
                console.log("-------------------------------------")
                console.log(td.TrsrBd.nm)
                console.log(td.TrsrBd.isinCd)
                console.log(td.TrsrBd.untrRedVal)
                console.log(td.TrsrBd.mtrtyDt)
            }
        } catch (e) {
            console.error(e)
        }
    }

}