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
exports.AdressesRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../../../../../shared/infra/typeorm/database");
const Adress_1 = require("../entities/Adress");
let AdressesRepository = class AdressesRepository {
    constructor() {
        this.repository = database_1.connection.getRepository(Adress_1.Adress);
    }
    create({ adress, city, district, complement, latitude, longitude, number, state, zip_code, id }) {
        const newAdress = this.repository.create({
            zip_code,
            adress,
            city,
            complement,
            id,
            latitude,
            longitude,
            number,
            state,
            district
        });
        return this.repository.save(newAdress);
    }
    findById(id) {
        return this.repository.findOne({ where: { id } });
    }
};
AdressesRepository = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], AdressesRepository);
exports.AdressesRepository = AdressesRepository;
