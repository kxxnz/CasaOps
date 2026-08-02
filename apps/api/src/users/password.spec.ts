import { hashPassword, verifyPassword } from './password';

describe('password', () => {
  it('deve gerar e validar o hash da senha', async () => {
    const hash = await hashPassword('senha-segura');

    await expect(verifyPassword('senha-segura', hash)).resolves.toBe(true);
    await expect(verifyPassword('senha-incorreta', hash)).resolves.toBe(false);
  });
});
