import { startLambdaServer } from '@yjcapp/api-utils'
import { groupRouter } from './groupRouter'
import { environment } from './environments/environment'

export const handler = startLambdaServer(
  groupRouter,
  !environment.production,
  !environment.production ? 8086 : 8080,
)
