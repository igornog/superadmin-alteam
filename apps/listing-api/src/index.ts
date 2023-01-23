import { startLambdaServer } from '@yjcapp/api-utils'
import { listingRouter } from './listingRouter'
import { environment } from './environments/environment'

export const handler = startLambdaServer(
  listingRouter,
  !environment.production,
  !environment.production ? 8083 : 8080,
)
