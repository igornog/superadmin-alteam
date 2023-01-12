import express from 'express'
import { authorize, sendPromise } from '@yjcapp/api-utils'
import { listingService } from './listingService'

export const listingRouter = express.Router()
listingRouter.use(express.json())

listingRouter.use(authorize)

listingRouter.post('/listing/project', (req, res, next) => {
  sendPromise(listingService.createProject(req.body), res, next)
})
