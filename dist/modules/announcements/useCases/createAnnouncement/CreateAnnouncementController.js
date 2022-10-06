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
exports.CreateAnnouncementController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateAnnouncementUseCase_1 = require("./CreateAnnouncementUseCase");
class CreateAnnouncementController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: id_user } = req.user;
            const data = req.body;
            const images = req.files;
            const createAnnouncementUseCase = tsyringe_1.container.resolve(CreateAnnouncementUseCase_1.CreateAnnouncementUseCase);
            const adress = {
                adress: data.adress,
                city: data.city,
                district: data.district,
                number: data.number,
                state: data.state,
                zip_code: data.zip_code,
                complement: data.complement
            };
            const announcement = {
                description: data.description,
                meter: data.meter,
                title: data.title
            };
            const response = yield createAnnouncementUseCase.execute({
                adress,
                announcement,
                id_category: data.id_category,
                id_user,
                images
            });
            return res.status(201).json(response);
        });
    }
}
exports.CreateAnnouncementController = CreateAnnouncementController;
