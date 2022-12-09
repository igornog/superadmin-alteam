import express from 'express'
import {webflowWebhookToTalent} from './webflow/webflowToTalent'
import {isGroupTalent} from '@yjcapp/talent'
import {talentService} from './talentService'
import {authorize, logger, sendPromise} from '@yjcapp/api-utils'
import {Talent, TalentSearch} from '@yjcapp/app'

export const talentRouter = express.Router()
talentRouter.use(express.json())

talentRouter.post('/talent/webflow/webhook', (req, res, next) => {
  logger.info('Webflow webhook', {body: req.body})
  const talent = webflowWebhookToTalent(req.body)
  if (isGroupTalent(talent as Talent)) {
    // @ts-ignore
    sendPromise(talentService.createGroupTalent(talent), res, next)
  } else {
    // @ts-ignore
    sendPromise(talentService.createSoloTalent(talent), res, next)
  }
})

talentRouter.use(authorize)

talentRouter.get('/talent/group/:id', (req, res, next) => {
  sendPromise(talentService.retrieveGroupTalent(req.params.id), res, next)
})
talentRouter.post('/talent/solo', (req, res, next) => {
  sendPromise(talentService.createSoloTalent(req.body), res, next)
})
talentRouter.put('/talent/solo', (req, res, next) => {
  sendPromise(talentService.updateSoloTalent(req.body), res, next)
})
talentRouter.get('/talent/solo/:id', (req, res, next) => {
  sendPromise(talentService.retrieveSoloTalent(req.params.id), res, next)
})
talentRouter.get('/talent/search', (req, res, next) => {
  sendPromise(
    talentService.searchSoloTalent(req.query ?? {}),
    res,
    next,
  )
})

