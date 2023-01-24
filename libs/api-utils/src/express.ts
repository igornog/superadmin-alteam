import express, { Router } from 'express'
import morgan from 'morgan'
import { errorHandler } from './errorHandler'
import { lambdaHandler, startLocal } from './handler'
import cors from 'cors'

export function createDefaultApp(router: Router) {
  return express()
    .use(cors())
    .use(morgan('combined'))
    .use(router)
    .use(errorHandler)
}

export function startLambdaServer(router: Router, local: boolean, port = 8080) {
  if (local) {
    startLocal(createDefaultApp(router), port)
  } else {
    return lambdaHandler(createDefaultApp(router))
  }
}
