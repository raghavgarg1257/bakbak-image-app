import ImageService from '../services/ImageService';
import { ExceptionHandler } from '../utils/exceptions';

export default class UserController {
  static compress(req, res) {
    return new ImageService(req).compress()
      .then((image) => {
        res.setHeader('Content-type', image.mime);
        res.setHeader('X-butteraugli', image.score);
        image.data.pipe(res);
      })
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }
}
