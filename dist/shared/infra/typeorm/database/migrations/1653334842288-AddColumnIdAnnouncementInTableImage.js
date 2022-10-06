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
exports.AddColumnIdAnnouncementInTableImage1653334842288 = void 0;
const typeorm_1 = require("typeorm");
class AddColumnIdAnnouncementInTableImage1653334842288 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumn('image', new typeorm_1.TableColumn({
                name: 'id_announcement',
                type: 'int',
                isNullable: true,
                default: 'NULL'
            }));
            yield queryRunner.createForeignKey('image', new typeorm_1.TableForeignKey({
                name: 'FK_Image_Announcement',
                referencedTableName: 'announcement',
                referencedColumnNames: ['id'],
                columnNames: ['id_announcement'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('image', 'FK_Image_Announcement');
            yield queryRunner.dropColumn('image', 'id_announcement');
        });
    }
}
exports.AddColumnIdAnnouncementInTableImage1653334842288 = AddColumnIdAnnouncementInTableImage1653334842288;
