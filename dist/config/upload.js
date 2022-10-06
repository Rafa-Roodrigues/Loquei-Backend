"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const crypto_1 = require("crypto");
exports.default = {
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, (0, path_1.resolve)(__dirname, '..', 'tmp'));
        },
        filename(req, file, cb) {
            const hash = (0, crypto_1.randomBytes)(16).toString('hex');
            cb(null, `${hash}-${file.originalname}`);
        }
    })
};
