import { DataSource } from 'typeorm';

export const connection = new DataSource({
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

connection
  .initialize()
  .then(() => console.log('Banco rodando...'))
  .catch((err) => console.log(err));
