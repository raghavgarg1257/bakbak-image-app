import Exception from './Exception';

export default class BadRequestException extends Exception {
  constructor(message = 'Bad request. Please try again after some time.') {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message;
  }
}
