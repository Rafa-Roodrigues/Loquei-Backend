import multer from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

export default {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, resolve(__dirname, '..', 'tmp'));
    },
    filename(req, file, cb) {
      const hash = randomBytes(16).toString('hex');
      cb(null, `${hash}-${file.originalname}`);
    }
  })
};
