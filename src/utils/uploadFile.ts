import multer from 'multer';
import configUpload from '../config/upload';

export const uploadFile = multer(configUpload);
