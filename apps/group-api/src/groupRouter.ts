import express from 'express'
import { authorize, sendPromise } from '@yjcapp/api-utils'
import { groupService } from './groupService'

export const groupRouter = express.Router()
groupRouter.use(express.json())

groupRouter.use(authorize)

groupRouter.post('/group', (req, res, next) => {
  sendPromise(groupService.createGroup(req.body), res, next)
})
