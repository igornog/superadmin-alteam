import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  statusCode?: number;

  body? : any;

  constructor(statusCode: number, body?: any) {
    super(`Http error ${statusCode}`);
    this.statusCode = statusCode;
    this.body = body;
  }
}

function handleError(err: HttpError, res: Response): void {
  console.log(err.message, err.statusCode, err.body);
  if (err.statusCode) {
    res.status(err.statusCode)
      .json(err.body);
  } else {
    res.sendStatus(500);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  handleError(err, res);
}
