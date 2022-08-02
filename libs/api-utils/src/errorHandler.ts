import { NextFunction, Request, Response } from 'express';
import {logger} from "./logger";

export class HttpError extends Error {
  statusCode?: number;

  constructor(statusCode: number, message ?: string) {
    super(`HTTP ERROR ${statusCode}: ${message ?? ""}`);
    this.statusCode = statusCode;
  }
}

function handleError(err: HttpError, res: Response): void {
  logger.info(err.message,{statusCode : err.statusCode})
  if (err.statusCode) {
    res.status(err.statusCode)
      .send(err.message);
  } else {
    res.sendStatus(500);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  handleError(err, res);
}
