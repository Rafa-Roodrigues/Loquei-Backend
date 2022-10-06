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
exports.CreateAnnouncement1653332302630 = void 0;
const typeorm_1 = require("typeorm");
class CreateAnnouncement1653332302630 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'announcement',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isPrimary: true
                    },
                    {
                        name: 'title',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'longtext'
                    },
                    {
                        name: 'meter',
                        type: 'varchar'
                    },
                    {
                        name: 'id_adress',
                        type: 'int'
                    },
                    {
                        name: 'id_category',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FK_Announcement_Adress',
                        referencedTableName: 'adress',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_adress'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FK_Announcement_Category',
                        referencedTableName: 'category',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_category'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('announcement');
        });
    }
}
exports.CreateAnnouncement1653332302630 = CreateAnnouncement1653332302630;
