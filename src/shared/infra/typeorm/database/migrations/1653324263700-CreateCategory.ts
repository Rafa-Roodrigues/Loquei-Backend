import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategory1653324263700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
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
            name: 'id_image',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_Category_Image',
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
    await queryRunner.dropTable('category');
  }
}
