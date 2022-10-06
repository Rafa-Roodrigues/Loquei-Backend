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
exports.AddColumnIdUserInTableAnnouncement1653925173344 = void 0;
const typeorm_1 = require("typeorm");
class AddColumnIdUserInTableAnnouncement1653925173344 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumn('announcement', new typeorm_1.TableColumn({
                name: 'id_user',
                type: 'int'
            }));
            yield queryRunner.createForeignKey('announcement', new typeorm_1.TableForeignKey({
                name: 'FK_Announcement_User',
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
                columnNames: ['id_user'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('announcement', 'FK_Announcement_User');
            yield queryRunner.dropColumn('announcement', 'id_user');
        });
    }
}
exports.AddColumnIdUserInTableAnnouncement1653925173344 = AddColumnIdUserInTableAnnouncement1653925173344;
