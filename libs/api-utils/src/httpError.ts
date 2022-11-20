export class HttpError extends Error {
  statusCode?: number;

  constructor(statusCode: number, message ?: string) {
    super(`HTTP ERROR ${statusCode}: ${message ?? ""}`);
    this.statusCode = statusCode;
  }
  static unauthorized(message ?: string) {
    return new HttpError(403, message);
  }
}
