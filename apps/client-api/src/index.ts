import { startLambdaServer } from '@yjcapp/api-utils'
import { clientRouter } from './clientRouter'
import { environment } from './environments/environment'

export const handler = startLambdaServer(clientRouter, !environment.production, !environment.production ? 8082 : 8080)
