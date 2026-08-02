import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { Server } from 'node:http';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import type { HealthResponse } from '../src/health/health-response';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/health (GET)', async () => {
    const resposta = await request(app.getHttpServer() as Server)
      .get('/api/health')
      .expect(200);
    const body = resposta.body as HealthResponse;

    expect(body).toMatchObject({
      status: 'ok',
      service: 'casaops-api',
      version: '0.1.0',
      environment: 'test',
    });
    expect(body.uptimeSeconds).toEqual(expect.any(Number));
    expect(body.timestamp).toEqual(expect.any(String));
  });
});
