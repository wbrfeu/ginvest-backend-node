import nodelogger from 'logger'
import dateformat from 'dateformat'

// usar logger.info, .fatal, .error, .warn, .debug

var logger = null

function inicializaLogger() {
    logger = nodelogger.createLogger("ginvest.log")

    logger.format = function (level, date, message) {
        const msg = "[" + dateformat(date, "dd/mm/yyyy HH:MM:ss") + "] " + level + ":" + message

        // Imprime no Console caso o Ambiente não seja Produção
        if (process.env.ENV === undefined || process.env.ENV.toLowerCase().startsWith("prod") === false) {
            console.log(msg)
        }

        return msg
    }
}

export { inicializaLogger, logger }