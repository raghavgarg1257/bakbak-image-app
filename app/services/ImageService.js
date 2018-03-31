// /* eslint-disable */

import fs from 'fs';
import path from 'path';

import axios from 'axios';
import uuidV4 from 'uuid/v4';
import mime from 'mime';

import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import ImageminGm from 'imagemin-gm';
// import imageminWebp from 'imagemin-webp';

import butteraugli from 'butteraugli';

import BaseService from './BaseService';
import { fsWriteFile, getImagePixels } from '../utils/helpers';

export default class ImageService extends BaseService {
  compress() {
    const { url, width, height } = this.req.query;
    const publicDir = path.resolve('public');

    const imageminGm = new ImageminGm();

    return axios
      .get(url, { responseType: 'arraybuffer' })
      .then((response) => {
        const imageName = `${uuidV4()}.${mime.getExtension(response.headers['content-type'])}`;
        return Promise.all([
          imageName,
          fsWriteFile(path.join(publicDir, 'temp', imageName), response.data),
        ]);
      })
      .then((resolvedPromise) => {
        const [imageName] = resolvedPromise;

        const plugins = [
          imageminMozjpeg({ quality: 50 }),
          imageminPngquant({ quality: 50 }),
          // imageminWebp({ quality: 50 }),
        ];

        if (width || height) {
          plugins.push(imageminGm.resize({ width, height, gravity: 'Center' }));
        }

        return Promise.all([
          imageName,
          imagemin(
            [path.join(publicDir, 'temp', imageName)],
            path.join(publicDir, 'compressed'),
            { use: plugins },
          ),
        ]);
      })
      .then((resolvedPromise) => {
        const [imageName] = resolvedPromise;
        const originalPixel = getImagePixels(path.join(publicDir, 'temp', imageName));
        const compressedPixel = getImagePixels(path.join(publicDir, 'compressed', imageName));
        return Promise.all([imageName, originalPixel, compressedPixel]);
      })
      .then((resolvedPromise) => {
        const [imageName, originalPixel, compressedPixel] = resolvedPromise;

        const originalImage = {
          data: originalPixel.data,
          width: originalPixel.shape[0],
          height: originalPixel.shape[1],
        };
        const compressedImage = {
          data: compressedPixel.data,
          width: compressedPixel.shape[0],
          height: compressedPixel.shape[1],
        };

        const score = butteraugli(originalImage, compressedImage, []);

        return {
          score,
          name: imageName,
          mime: mime.getType(imageName),
          data: fs.createReadStream(path.join(publicDir, 'compressed', imageName)),
        };
      });
  }
}
