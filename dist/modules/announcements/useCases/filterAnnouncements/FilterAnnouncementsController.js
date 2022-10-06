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
exports.FilterAnnouncementsController = void 0;
const tsyringe_1 = require("tsyringe");
const FilterAnnouncementsUseCase_1 = require("./FilterAnnouncementsUseCase");
class FilterAnnouncementsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categorias, min, max, endereco, numero, estado, cidade, cep, km } = req.query;
            const filterAnnouncementsUseCase = tsyringe_1.container.resolve(FilterAnnouncementsUseCase_1.FilterAnnouncementsUseCase);
            const announcements = yield filterAnnouncementsUseCase.execute({
                categories: categorias,
                max: Number(max),
                min: Number(min),
                km: Number(km),
                adress: endereco,
                city: cidade,
                number: numero,
                state: estado,
                zip_code: cep
            });
            return res.json(announcements);
        });
    }
}
exports.FilterAnnouncementsController = FilterAnnouncementsController;
