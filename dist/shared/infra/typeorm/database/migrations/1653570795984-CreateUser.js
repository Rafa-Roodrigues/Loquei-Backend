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
exports.CreateUser1653570795984 = void 0;
const typeorm_1 = require("typeorm");
class CreateUser1653570795984 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'lastname',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'cpf',
                        type: 'char(14)'
                    },
                    {
                        name: 'whatsapp',
                        type: 'char(15)'
                    },
                    {
                        name: 'telefone_fixo',
                        type: 'char(14)',
                        isNullable: true,
                        default: 'NULL'
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name: 'id_image',
                        type: 'int',
                        isNullable: true,
                        default: 'NULL'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FK_User_Image',
                        referencedTableName: 'image',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_image'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('user');
        });
    }
}
exports.CreateUser1653570795984 = CreateUser1653570795984;
