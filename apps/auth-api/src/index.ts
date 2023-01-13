import { startLambdaServer } from '@yjcapp/api-utils'
import express from 'express'
import { environment } from './environments/environment'
import { signToken } from '@yjcapp/api-utils'

const router = express
  .Router()
  .use(express.json())
  .post('/auth/login', (req, res) => {
    const { email, password } = req.body
    if (email === 'admin@alteam.io' && password === 'bestappoftheworld') {
      const user = { email, name: 'admin' }
      const token = signToken(user)
      res.send({ token, user })
    } else {
      res.sendStatus(403)
    }
  })
export const handler = startLambdaServer(
  router,
  !environment.production,
  !environment.production ? 8085 : 8080,
)
