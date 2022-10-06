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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = void 0;
const typeorm_1 = require("typeorm");
const Adress_1 = require("./Adress");
const Category_1 = require("./Category");
const Image_1 = require("../../../../../shared/infra/typeorm/entities/Image");
const User_1 = require("../../../../users/infra/typeorm/entities/User");
let Announcement = class Announcement {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Announcement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Announcement.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Announcement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Announcement.prototype, "meter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Announcement.prototype, "id_adress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Announcement.prototype, "id_category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Announcement.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Adress_1.Adress, (adress) => adress.id),
    (0, typeorm_1.JoinColumn)({ name: 'id_adress' }),
    __metadata("design:type", Adress_1.Adress)
], Announcement.prototype, "adress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.id),
    (0, typeorm_1.JoinColumn)({ name: 'id_category' }),
    __metadata("design:type", Category_1.Category)
], Announcement.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Image_1.Image, (image) => image.announcement, {}),
    __metadata("design:type", Array)
], Announcement.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", User_1.User)
], Announcement.prototype, "user", void 0);
Announcement = __decorate([
    (0, typeorm_1.Entity)('announcement')
], Announcement);
exports.Announcement = Announcement;
