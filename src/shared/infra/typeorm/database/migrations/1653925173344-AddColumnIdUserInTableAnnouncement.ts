import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnIdUserInTableAnnouncement1653925173344
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'announcement',
      new TableColumn({
        name: 'id_user',
        type: 'int'
      })
    );

    await queryRunner.createForeignKey(
      'announcement',
      new TableForeignKey({
        name: 'FK_Announcement_User',
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        columnNames: ['id_user'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('announcement', 'FK_Announcement_User');
    await queryRunner.dropColumn('announcement', 'id_user');
  }
}
