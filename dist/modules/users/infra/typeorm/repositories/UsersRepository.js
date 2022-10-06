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
exports.UsersRepository = void 0;
const database_1 = require("../../../../../shared/infra/typeorm/database");
const User_1 = require("../entities/User");
class UsersRepository {
    constructor() {
        this.repository = database_1.connection.getRepository(User_1.User);
    }
    create({ cpf, email, lastname, name, password, image, whatsapp, telefone_fixo, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.repository.create({
                name,
                lastname,
                email,
                cpf,
                password,
                id,
                whatsapp,
                telefone_fixo,
                image
            });
            yield this.repository.save(user);
        });
    }
    findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    findByEmail(email) {
        return this.repository
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.image', 'i')
            .where('u.email = :email', { email })
            .getOne();
    }
    findByCpf(cpf) {
        return this.repository.findOne({ where: { cpf } });
    }
    getUser(id) {
        return this.repository
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.image', 'i')
            .where('u.id = :id', { id })
            .getOne();
    }
}
exports.UsersRepository = UsersRepository;
