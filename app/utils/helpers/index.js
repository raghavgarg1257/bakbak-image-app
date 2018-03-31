import fs from 'fs';
import getPixels from 'get-pixels';

export function isExist(val) {
  if (
    typeof val === 'undefined' ||
    val === undefined ||
    val === null ||
    val === '' ||
    (val instanceof Array && val.length === 0) ||
    (typeof val === 'object' && Object.keys(val).length === 0)
  ) {
    return false;
  }

  return true;
}

export function ExtendableBuiltin(cls) {
  function ExtendableBuiltinClass() {
    cls.apply(this, arguments); // eslint-disable-line
  }
  ExtendableBuiltinClass.prototype = Object.create(cls.prototype);
  Object.setPrototypeOf(ExtendableBuiltinClass, cls);
  return ExtendableBuiltinClass;
}

export function fsWriteFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => (err ? reject(err) : resolve()));
  });
}

export function getImagePixels(path) {
  return new Promise((resolve, reject) => {
    getPixels(path, (err, pixel) => (err ? reject(err) : resolve(pixel)));
  });
}
