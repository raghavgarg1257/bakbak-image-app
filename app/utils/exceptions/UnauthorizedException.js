import Exception from './Exception';

export default class UnauthorizedException extends Exception {
  constructor(message = "[Authentication Error] You're not allowed to access this request.") {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message;
  }
}
