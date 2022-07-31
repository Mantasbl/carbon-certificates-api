export class CertificateDoesNotBelongToUserError extends Error {
  constructor(message = 'This certificate does not belong to current user') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
