import Exception from './Exception';

export default class NotFoundException extends Exception {
  constructor(message = 'Entity not found.') {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message;
  }
}
