"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const token_1 = require("../../../../config/token");
const UsersRepository_1 = require("../../../../modules/users/infra/typeorm/repositories/UsersRepository");
const AppError_1 = require("../../../error/AppError");
function ensureAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            throw new AppError_1.AppError('Enviar o token!', 401);
        }
        const [, token] = bearerToken.split(' ');
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, token_1.configToken.secret);
            const usersRepository = new UsersRepository_1.UsersRepository();
            const user = yield usersRepository.findById(Number(decoded.sub));
            if (!user)
                throw new AppError_1.AppError('Usuário não existe!', 401);
            req.user = {
                id: user.id
            };
            next();
        }
        catch (_a) {
            throw new AppError_1.AppError('Token inválido!', 401);
        }
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
