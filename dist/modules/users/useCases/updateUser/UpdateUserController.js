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
exports.UpdateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateUserUseCase_1 = require("./UpdateUserUseCase");
class UpdateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const { email, password, whatsapp, telefone_fixo, name, lastname } = req.body;
            const image = req.file;
            const updateUserUseCase = tsyringe_1.container.resolve(UpdateUserUseCase_1.UpdateUserUseCase);
            const user = yield updateUserUseCase.execute({
                id: Number(id),
                email,
                password,
                image,
                telefone_fixo,
                whatsapp,
                name,
                lastname
            });
            return res.status(200).json(user);
        });
    }
}
exports.UpdateUserController = UpdateUserController;
