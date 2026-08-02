import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { createDatabaseConfig } from './database.config';

export const appDataSource = new DataSource(createDatabaseConfig());
