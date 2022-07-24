import server from '@vendia/serverless-express';
import { Express } from 'express';
import { APIGatewayProxyHandler } from 'aws-lambda';

export function lambdaHandler(app: Express): APIGatewayProxyHandler {
  return server({ app });
}

export function startLocal(app: Express) {
  // eslint-disable-next-line no-console
  app.listen(8080, () => console.log('Connected successfully on port 8080'));
}

