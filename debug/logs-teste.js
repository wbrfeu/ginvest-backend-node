import { inicializaVariaveisAmbiente } from '../infra/environment/init-env.js'
import { inicializaLogger, logger } from '../infra/logger/logger.js'

inicializaVariaveisAmbiente()

inicializaLogger()

logger.info('Teste Info')
logger.fatal('Teste Fatal')
logger.error('Teste Erro')
logger.warn('Teste de Aviso')
logger.debug('Teste Debug')