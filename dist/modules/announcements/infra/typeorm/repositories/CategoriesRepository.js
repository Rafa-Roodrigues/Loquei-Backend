"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const database_1 = require("../../../../../shared/infra/typeorm/database");
const Category_1 = require("../entities/Category");
class CategoriesRepository {
    constructor() {
        this.repository = database_1.connection.getRepository(Category_1.Category);
    }
    findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    create({ id, name, image }) {
        const category = this.repository.create({ id, image, name });
        return this.repository.save(category);
    }
    findByName(name) {
        return this.repository.findOne({ where: { name } });
    }
    all() {
        return this.repository
            .createQueryBuilder('c')
            .innerJoinAndSelect('c.image', 'i')
            .getMany();
    }
}
exports.CategoriesRepository = CategoriesRepository;
