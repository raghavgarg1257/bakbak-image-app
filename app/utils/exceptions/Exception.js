import { ExtendableBuiltin } from '../helpers';

export default class Exception extends ExtendableBuiltin(Error) {
  constructor() {
    super();
    if (this.constructor === Exception) {
      throw new TypeError('Abstract class "Exception" cannot be instantiated directly.');
    }
  }
}
