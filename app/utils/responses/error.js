import _ from 'lodash';

export default function (res, data, statusCode = 500) {
  const response = {
    code: statusCode,
    message: 'Something went wrong. Please try again after some time.',
  };

  if (_.isError(data)) {
    if (data.message) {
      response.message = data.message;
    }
    if (data.errors) {
      response.errors = data.errors;
    }
  }

  if (_.isString(data)) {
    response.message = data;
  }

  res.status(statusCode);
  return res.json(response);
}
