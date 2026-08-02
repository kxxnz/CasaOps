import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import type { DataSourceOptions } from 'typeorm';
import { CreateUsersTable1722560400000 } from './migrations/1722560400000-create-users-table';
import { User } from '../users/entities/user.entity';

export function createDatabaseConfig(): DataSourceOptions {
  const databasePath = resolve(
    process.cwd(),
    process.env.DATABASE_PATH ?? './data/casaops.db',
  );

  mkdirSync(dirname(databasePath), { recursive: true });

  return {
    type: 'sqljs',
    location: databasePath,
    autoSave: true,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [CreateUsersTable1722560400000],
    migrationsRun: true,
  };
}
