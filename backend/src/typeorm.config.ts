import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: '.env' });

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ecommerce',
  entities: [join(__dirname, './entities/*.entity.ts')],
  synchronize: true,
};
