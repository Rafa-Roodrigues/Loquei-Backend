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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.CreateAnnouncementUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/error/AppError");
const azure_1 = require("../../../../shared/infra/azure");
const getAdress_1 = require("../../../../utils/getAdress");
let CreateAnnouncementUseCase = class CreateAnnouncementUseCase {
    constructor(announcementsRepository, imagesRepository, adressesRepository, categoriesRepository, usersRepository, azure) {
        this.announcementsRepository = announcementsRepository;
        this.imagesRepository = imagesRepository;
        this.adressesRepository = adressesRepository;
        this.categoriesRepository = categoriesRepository;
        this.usersRepository = usersRepository;
        this.azure = azure;
    }
    execute({ adress, announcement, id_category, images, id_user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(id_user);
            if (!user)
                throw new AppError_1.AppError('Usuario não existe');
            if (!images)
                throw new AppError_1.AppError('Enviar as imagens do produto');
            if (images.length === 0)
                throw new AppError_1.AppError('Enviar as imagens do produto');
            const category = yield this.categoriesRepository.findById(id_category);
            if (!category)
                throw new AppError_1.AppError('Selecione uma categoria válida');
            // Cadastrando imagens na azure
            const imagesAzure = yield Promise.all(images.map((image) => this.azure.uploadFile({ nameContainer: 'imagensprodutos', file: image })));
            // Cadastrando imagens no BD
            const productImages = yield Promise.all(imagesAzure.map(({ etag, name, url }) => this.imagesRepository.create({ etag, name, url })));
            const infoAdress = yield (0, getAdress_1.getAdress)({
                city: adress.city,
                adress: adress.adress,
                number: adress.number,
                state: adress.state,
                zip_code: adress.zip_code
            });
            const { lat, lng } = infoAdress.data.results[0].locations[0].latLng;
            const newAdress = yield this.adressesRepository.create({
                adress: adress.adress,
                city: adress.city,
                complement: adress.complement,
                district: adress.district,
                latitude: lat,
                longitude: lng,
                number: adress.number,
                state: adress.state,
                zip_code: adress.zip_code
            });
            // Criando um anuncio
            yield this.announcementsRepository.create({
                description: announcement.description,
                meter: announcement.meter,
                title: announcement.title,
                images: productImages,
                id_adress: newAdress.id,
                id_category: category.id,
                id_user: user.id
            });
        });
    }
};
CreateAnnouncementUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('AnnouncementsRepository')),
    __param(1, (0, tsyringe_1.inject)('ImagesRepository')),
    __param(2, (0, tsyringe_1.inject)('AdressesRepository')),
    __param(3, (0, tsyringe_1.inject)('CategoriesRepository')),
    __param(4, (0, tsyringe_1.inject)('UsersRepository')),
    __param(5, (0, tsyringe_1.inject)('Azure')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, azure_1.Azure])
], CreateAnnouncementUseCase);
exports.CreateAnnouncementUseCase = CreateAnnouncementUseCase;
