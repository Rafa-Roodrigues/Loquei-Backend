"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("../typeorm/database");
require("../tsyringe");
const routes_1 = require("./routes");
const AppError_1 = require("../../error/AppError");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    });
});
app.listen(process.env.PORT || 8080, () => {
    console.log("Backend rodando na porta 8080");
});
