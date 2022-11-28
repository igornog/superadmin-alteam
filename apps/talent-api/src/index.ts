import { startLambdaServer } from '@yjcapp/api-utils'
import { environment } from './environments/environment'
import { talentRouter } from './talentRouter'

export const handler = startLambdaServer(talentRouter, !environment.production)
