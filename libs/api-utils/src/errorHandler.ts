import { NextFunction, Request, Response } from 'express'
import { logger } from './logger'
import { HttpError } from './httpError'

function handleError(err: HttpError, res: Response): void {
  logger.error(err.message, { statusCode: err.statusCode })
  if (err.statusCode !== undefined) {
    res.status(err.statusCode).send(err.message)
  } else {
    res.sendStatus(500)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  handleError(err, res)
}
