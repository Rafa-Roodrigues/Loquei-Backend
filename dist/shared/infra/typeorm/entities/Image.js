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
exports.Image = void 0;
const typeorm_1 = require("typeorm");
const Announcement_1 = require("../../../../modules/announcements/infra/typeorm/entities/Announcement");
let Image = class Image {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "etag", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Announcement_1.Announcement, (announcement) => announcement.images),
    (0, typeorm_1.JoinColumn)({ name: 'id_announcement' }),
    __metadata("design:type", Announcement_1.Announcement)
], Image.prototype, "announcement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Image.prototype, "id_announcement", void 0);
Image = __decorate([
    (0, typeorm_1.Entity)('image')
], Image);
exports.Image = Image;
