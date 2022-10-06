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
exports.CreateCategoryUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/error/AppError");
const azure_1 = require("../../../../shared/infra/azure");
const ImagesRepository_1 = require("../../../../shared/infra/typeorm/repositories/ImagesRepository");
let CreateCategoryUseCase = class CreateCategoryUseCase {
    constructor(categoriesRepository, imagesRepository, azure) {
        this.categoriesRepository = categoriesRepository;
        this.imagesRepository = imagesRepository;
        this.azure = azure;
    }
    execute({ nameCategory, image }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new AppError_1.AppError('Enviar a imagem que representará a categoria');
            const category = yield this.categoriesRepository.findByName(nameCategory);
            if (category)
                throw new AppError_1.AppError('Categoria já existe!');
            const { etag, name, url } = yield this.azure.uploadFile({
                nameContainer: 'categorias',
                file: image
            });
            const imageCategory = yield this.imagesRepository.create({ name, url, etag });
            const newCategory = yield this.categoriesRepository.create({
                name: nameCategory,
                image: imageCategory
            });
            return newCategory;
        });
    }
};
CreateCategoryUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('CategoriesRepository')),
    __param(1, (0, tsyringe_1.inject)('ImagesRepository')),
    __param(2, (0, tsyringe_1.inject)('Azure')),
    __metadata("design:paramtypes", [Object, ImagesRepository_1.ImagesRepository,
        azure_1.Azure])
], CreateCategoryUseCase);
exports.CreateCategoryUseCase = CreateCategoryUseCase;
