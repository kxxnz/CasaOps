import { Injectable } from '@nestjs/common';
import apiPackage from '../../package.json';
import type { HealthResponse } from './health-response';

@Injectable()
export class HealthService {
  getStatus(): HealthResponse {
    return {
      status: 'ok',
      service: 'casaops-api',
      version: apiPackage.version,
      environment: process.env.NODE_ENV ?? 'development',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
