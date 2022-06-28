import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1653570795984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'lastname',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'cpf',
            type: 'char(14)'
          },
          {
            name: 'whatsapp',
            type: 'char(15)'
          },
          {
            name: 'telefone_fixo',
            type: 'char(14)',
            isNullable: true,
            default: 'NULL'
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'id_image',
            type: 'int',
            isNullable: true,
            default: 'NULL'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_User_Image',
            referencedTableName: 'image',
            referencedColumnNames: ['id'],
            columnNames: ['id_image'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
