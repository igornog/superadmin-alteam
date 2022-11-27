import { RequestHandler } from 'express'
import { HttpError } from './httpError'
import jwt from 'jsonwebtoken'

export const authorize: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.split(' ')[1]
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)
      if (payload.sub === "admin") {
        next()
      } else {
        next(HttpError.unauthorized('Invalid sub'))
      }
    } catch (e) {
      next(HttpError.unauthorized(e.message))
    }
  } else {
    next(HttpError.unauthorized('Unauthorized'))
  }
}
export function signToken(payload: object) {
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}
