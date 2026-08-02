import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Pick<Repository<User>, 'findOneBy'>>;

  beforeEach(async () => {
    repository = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repository },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('deve normalizar o email antes da consulta', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await service.findByEmail(' ADMIN@CasaOps.Local ');

    expect(repository.findOneBy).toHaveBeenCalledWith({
      email: 'admin@casaops.local',
    });
  });
});
