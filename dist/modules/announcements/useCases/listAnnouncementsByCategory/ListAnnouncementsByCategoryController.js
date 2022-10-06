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
exports.ListAnnouncementsByCategoryController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAnnouncementsByCategoryUseCase_1 = require("./ListAnnouncementsByCategoryUseCase");
class ListAnnouncementsByCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const listAnnouncementsByCategoryUseCase = tsyringe_1.container.resolve(ListAnnouncementsByCategoryUseCase_1.ListAnnouncementsByCategoryUseCase);
            const announcements = yield listAnnouncementsByCategoryUseCase.execute(Number(id));
            return res.json(announcements);
        });
    }
}
exports.ListAnnouncementsByCategoryController = ListAnnouncementsByCategoryController;
