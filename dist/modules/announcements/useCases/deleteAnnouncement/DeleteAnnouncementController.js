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
exports.DeleteAnnouncementController = void 0;
const tsyringe_1 = require("tsyringe");
const DeleteAnnouncementUseCase_1 = require("./DeleteAnnouncementUseCase");
class DeleteAnnouncementController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: id_announcement } = req.params;
            const { id: id_user } = req.user;
            const deleteAnnouncementUseCase = tsyringe_1.container.resolve(DeleteAnnouncementUseCase_1.DeleteAnnouncementUseCase);
            yield deleteAnnouncementUseCase.execute({
                id_announcement: Number(id_announcement),
                id_user
            });
            return res.status(200).json();
        });
    }
}
exports.DeleteAnnouncementController = DeleteAnnouncementController;
