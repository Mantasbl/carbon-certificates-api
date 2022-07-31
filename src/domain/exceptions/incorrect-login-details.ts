export class IncorrectLoginDetails extends Error {
  constructor(message = 'No user matching these details found') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
