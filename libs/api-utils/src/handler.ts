import server from '@vendia/serverless-express'
import { Express } from 'express'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { logger } from './logger'

export function lambdaHandler(app: Express): APIGatewayProxyHandler {
  return server({ app })
}

export function startLocal(app: Express, port = 8080) {
  // eslint-disable-next-line no-console
  app.listen(port, () => logger.info(`Connected successfully on port ${port}`))
}
