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
exports.CreateAdress1653330587675 = void 0;
const typeorm_1 = require("typeorm");
class CreateAdress1653330587675 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'adress',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isPrimary: true
                    },
                    {
                        name: 'zip_code',
                        type: 'char(9)'
                    },
                    {
                        name: 'city',
                        type: 'varchar'
                    },
                    {
                        name: 'district',
                        type: 'varchar'
                    },
                    {
                        name: 'adress',
                        type: 'varchar'
                    },
                    {
                        name: 'number',
                        type: 'varchar'
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                        default: 'NULL'
                    },
                    {
                        name: 'state',
                        type: 'char(2)'
                    },
                    {
                        name: 'latitude',
                        type: 'varchar'
                    },
                    {
                        name: 'longitude',
                        type: 'varchar'
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('adress');
        });
    }
}
exports.CreateAdress1653330587675 = CreateAdress1653330587675;
