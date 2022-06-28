import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnIdAnnouncementInTableImage1653334842288
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'image',
      new TableColumn({
        name: 'id_announcement',
        type: 'int',
        isNullable: true,
        default: 'NULL'
      })
    );

    await queryRunner.createForeignKey(
      'image',
      new TableForeignKey({
        name: 'FK_Image_Announcement',
        referencedTableName: 'announcement',
        referencedColumnNames: ['id'],
        columnNames: ['id_announcement'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('image', 'FK_Image_Announcement');
    await queryRunner.dropColumn('image', 'id_announcement');
  }
}
