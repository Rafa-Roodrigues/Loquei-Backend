"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AnnouncementsRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../../../../../shared/infra/typeorm/database");
const Announcement_1 = require("../entities/Announcement");
let AnnouncementsRepository = class AnnouncementsRepository {
    constructor() {
        this.repository = database_1.connection.getRepository(Announcement_1.Announcement);
    }
    create({ id_adress, id_category, description, id_user, images, meter, title, id }) {
        const announcement = this.repository.create({
            id_adress,
            id_category,
            description,
            id,
            id_user,
            images,
            meter,
            title
        });
        return this.repository.save(announcement);
    }
    all() {
        return this.repository
            .createQueryBuilder('a')
            .innerJoinAndSelect('a.images', 'i')
            .innerJoinAndSelect('a.adress', 'd')
            .innerJoinAndSelect('a.category', 'c')
            .getMany();
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository
                .createQueryBuilder()
                .delete()
                .from(Announcement_1.Announcement)
                .where('id = :id', { id })
                .execute();
        });
    }
    findById(id) {
        return this.repository
            .createQueryBuilder('a')
            .innerJoinAndSelect('a.images', 'i')
            .innerJoinAndSelect('a.adress', 'd')
            .innerJoinAndSelect('a.category', 'c')
            .innerJoinAndSelect('a.user', 'u')
            .andWhere('a.id = :id', { id })
            .getOne();
    }
    findByCategory(id) {
        return this.repository
            .createQueryBuilder('a')
            .innerJoinAndSelect('a.images', 'i')
            .innerJoinAndSelect('a.adress', 'd')
            .innerJoinAndSelect('a.category', 'c')
            .andWhere('a.id_category = :id', { id })
            .getMany();
    }
    limitAnnouncements(id) {
        return this.repository
            .createQueryBuilder('a')
            .innerJoinAndSelect('a.images', 'i')
            .innerJoinAndSelect('a.adress', 'd')
            .innerJoinAndSelect('a.category', 'c')
            .andWhere('a.id != :id', { id })
            .limit(5)
            .getMany();
    }
    listAnnouncementsOfUser(id) {
        return this.repository
            .createQueryBuilder('a')
            .innerJoinAndSelect('a.adress', 'd')
            .innerJoinAndSelect('a.category', 'c')
            .innerJoinAndSelect('a.images', 'i')
            .where('a.id_user = :id', { id })
            .getMany();
    }
    filter({ categories, latitude, longitude, max, min }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.repository
                .createQueryBuilder('a')
                .select('a.id, d.latitude, d.longitude, a.title, d.adress, d.zip_code, d.city, d.state')
                .innerJoin('a.adress', 'd')
                .innerJoin('a.category', 'c')
                .andWhere('a.id_adress = d.id')
                .andWhere('a.id_category = c.id');
            if (categories && categories.length > 0) {
                query.andWhere('a.id_category IN (:...ids)', { ids: categories });
            }
            if (min && max)
                query.andWhere('a.meter BETWEEN :min AND :max', { min, max });
            if (min && !max)
                query.andWhere(`a.meter >= :min`, { min });
            if (max && !min)
                query.andWhere('a.meter <= :max', { max });
            if (latitude && longitude) {
                query
                    .addSelect('(6371 * acos( cos(radians(:latitude)) * cos(radians(latitude)) * cos(radians(:longitude) - radians(longitude)) + sin(radians(:latitude)) * sin(radians(latitude))))', 'distance')
                    .having('distance <= 10')
                    .setParameters({ latitude, longitude });
                return query.getRawMany();
            }
            return query.getRawMany();
        });
    }
};
AnnouncementsRepository = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], AnnouncementsRepository);
exports.AnnouncementsRepository = AnnouncementsRepository;
