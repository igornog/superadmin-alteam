import express from 'express'
import { authorize, sendPromise } from '@yjcapp/api-utils'
import { clientService } from './clientService'

export const clientRouter = express.Router()
clientRouter.use(express.json())

clientRouter.use(authorize)

clientRouter.post('/client', (req, res, next) => {
  sendPromise(clientService.createClient(req.body), res, next)
})
