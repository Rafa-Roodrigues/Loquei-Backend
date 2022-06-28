import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAnnouncement1653332302630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'announcement',
        columns: [
          {
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'longtext'
          },
          {
            name: 'meter',
            type: 'varchar'
          },
          {
            name: 'id_adress',
            type: 'int'
          },
          {
            name: 'id_category',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_Announcement_Adress',
            referencedTableName: 'adress',
            referencedColumnNames: ['id'],
            columnNames: ['id_adress'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FK_Announcement_Category',
            referencedTableName: 'category',
            referencedColumnNames: ['id'],
            columnNames: ['id_category'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('announcement');
  }
}
