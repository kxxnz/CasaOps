import { appDataSource } from '../database/data-source';
import { UserRole } from '../users/entities/user-role.enum';
import { User } from '../users/entities/user.entity';
import { hashPassword } from '../users/password';

async function createAdmin(): Promise<void> {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error('Defina ADMIN_NAME, ADMIN_EMAIL e ADMIN_PASSWORD.');
  }

  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD deve ter pelo menos 12 caracteres.');
  }

  await appDataSource.initialize();
  await appDataSource.runMigrations();

  const repository = appDataSource.getRepository(User);
  const existingUser = await repository.findOneBy({ email });

  if (existingUser) {
    throw new Error(`Ja existe um usuario com o email ${email}.`);
  }

  const admin = repository.create({
    name,
    email,
    passwordHash: await hashPassword(password),
    role: UserRole.ADMIN,
    active: true,
  });

  await repository.save(admin);
  console.log(`Administrador criado: ${admin.email}`);
}

createAdmin()
  .catch((error: unknown) => {
    const message =
      error instanceof Error ? error.message : 'Erro desconhecido.';
    console.error(`Falha ao criar administrador: ${message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
    }
  });
