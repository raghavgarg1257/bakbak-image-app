import responses from '../utils/responses';

export default class RootController {
  static all(req, res) {
    return responses.ok(res, 'Bakbak API is Up and Running.!!');
  }
}
