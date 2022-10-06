"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("typeorm");
exports.connection = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'loquei.mysql.database.azure.com',
    username: 'managementUser',
    password: 'database127$',
    database: 'loquei',
    entities: [
        './src/shared/infra/typeorm/entities/*.ts',
        './src/modules/announcements/infra/typeorm/entities/*.ts',
        './src/modules/users/infra/typeorm/entities/*.ts'
    ],
    migrations: ['./src/shared/infra/typeorm/database/migrations/*.ts']
});
exports.connection
    .initialize()
    .then(() => console.log('Banco rodando...'))
    .catch((err) => console.log(err));
