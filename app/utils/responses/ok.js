import _ from 'lodash';

export default function (res, data, statusCode = 200) {
  const response = {
    code: statusCode,
    data,
  };

  if (_.isUndefined(data)) {
    response.message = 'The result is undefined';
  }

  if (_.isString(data)) {
    response.message = data;
  }

  res.status(statusCode);
  return res.json(response);
}
