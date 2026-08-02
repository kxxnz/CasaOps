import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1722560400000 implements MigrationInterface {
  name = 'CreateUsersTable1722560400000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', length: '120' },
          { name: 'email', type: 'varchar', length: '180', isUnique: true },
          { name: 'password_hash', type: 'varchar', length: '255' },
          {
            name: 'role',
            type: 'varchar',
            length: '20',
            default: "'RESIDENT'",
          },
          { name: 'active', type: 'boolean', default: true },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
