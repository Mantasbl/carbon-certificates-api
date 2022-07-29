export class CertificateNotFoundError extends Error {
  constructor(message = 'Certificate Not Found') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
