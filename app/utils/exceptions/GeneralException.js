import Exception from './Exception';

export default class GeneralException extends Exception {
  constructor(message = null, status = 500) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message;

    this.status = status;
  }
}
