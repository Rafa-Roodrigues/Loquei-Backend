import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAdress1653330587675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'adress',
        columns: [
          {
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'zip_code',
            type: 'char(9)'
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'district',
            type: 'varchar'
          },
          {
            name: 'adress',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'varchar'
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
            default: 'NULL'
          },
          {
            name: 'state',
            type: 'char(2)'
          },
          {
            name: 'latitude',
            type: 'varchar'
          },
          {
            name: 'longitude',
            type: 'varchar'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('adress');
  }
}
