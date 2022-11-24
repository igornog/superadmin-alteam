import { NextFunction, Response } from 'express'

export function sendPromise<T>(
  promise: Promise<T>,
  res: Response,
  next: NextFunction,
) {
  promise.then((data) => res.json(data)).catch((e) => next(e))
}
