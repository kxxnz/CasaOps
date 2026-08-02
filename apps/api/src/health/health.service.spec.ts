import { HealthService } from './health.service';

describe('HealthService', () => {
  const healthService = new HealthService();

  it('deve retornar o estado atual da aplicacao', () => {
    const resultado = healthService.getStatus();

    expect(resultado).toMatchObject({
      status: 'ok',
      service: 'casaops-api',
      version: '0.1.0',
      environment: 'test',
    });
    expect(resultado.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(resultado.timestamp).toBeTruthy();
  });
});
