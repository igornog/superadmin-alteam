import express from 'express'
import { authorize, sendPromise } from '@yjcapp/api-utils'
import { listingService } from './listingService'

export const listingRouter = express.Router()
listingRouter.use(express.json())

listingRouter.use(authorize)

listingRouter.post('/listing', (req, res, next) => {
  sendPromise(listingService.createListing(req.body), res, next)
})

listingRouter.get('/listing/search', (req, res, next) => {
  sendPromise(listingService.searchListing(req.query ?? {}), res, next)
})
