import { environment } from './environments/environment'
import { startLambdaServer } from '@yjcapp/api-utils'
import { router } from './router'

export const handler = startLambdaServer(
  router,
  !environment.production,
  !environment.production ? 8085 : 8080,
)
