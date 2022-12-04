import { RequestHandler } from 'express'
import { HttpError } from './httpError'
import jwt from 'jsonwebtoken'
import {logger} from "./logger";

export const authorize: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.split(' ')[1]
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)
      // @ts-ignore
      if (payload.email === "admin@alteam.io") {
        next()
      } else {
        logger.info({message: 'Unauthorized', payload})
        next(HttpError.unauthorized('Invalid sub'))
      }
    } catch (e) {
      logger.error('Error verifying token', { error: e })
      next(HttpError.unauthorized(e.message))
    }
  } else {
    next(HttpError.unauthorized('Unauthorized'))
  }
}
export function signToken(payload: object) {
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}
