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
exports.Azure = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const tsyringe_1 = require("tsyringe");
const deleteFile_1 = require("../../../utils/deleteFile");
let Azure = class Azure {
    constructor() {
        this.blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    }
    uploadFile({ nameContainer, file }) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerClient = this.blobServiceClient.getContainerClient(nameContainer);
            const blockBlobClient = containerClient.getBlockBlobClient(file.filename);
            const response = yield blockBlobClient.uploadFile(file.path, {
                blobHTTPHeaders: {
                    blobContentType: file.mimetype
                }
            });
            (0, deleteFile_1.deleteFile)(file.filename);
            return {
                url: `https://imagensloquei.blob.core.windows.net/${nameContainer}/${file.filename}`,
                name: file.filename,
                etag: response.etag
            };
        });
    }
    // Método precisa melhorar: Fazer a verificação se o blob existe, para depois deletar.
    deleteBlob({ nameContainer, urlFile }) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerClient = this.blobServiceClient.getContainerClient(nameContainer);
            yield containerClient.deleteBlob(urlFile);
        });
    }
};
Azure = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], Azure);
exports.Azure = Azure;
