import Exception from './Exception';

export default class ValidationException extends Exception {
  constructor(errors = {}, message = 'Request contain some non validated data.') {
    super(errors, message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.errors = errors;

    this.message = message;
  }
}
