import GeneralException from './GeneralException';
import BadRequestException from './BadRequestException';
import NotFoundException from './NotFoundException';
import UnauthorizedException from './UnauthorizedException';
import ValidationException from './ValidationException';

import responses from '../responses';

export default class ExceptionHandler {
  constructor(res, error) {
    console.error('----------------------------------------');
    console.error(error);
    console.error('----------------------------------------');

    switch (error.constructor) {
      case GeneralException:
        return responses.error(res, error, error.status);

      case BadRequestException:
        return responses.error(res, error, 400);

      case UnauthorizedException:
        return responses.error(res, error, 401);

      case NotFoundException:
        return responses.error(res, error, 404);

      case ValidationException:
        return responses.error(res, error, 422);

      default:
        return responses.error(res, error, 500);
    }
  }
}
