import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const entities = [__dirname + '/../entities/*{.ts,.js}'];

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities,
        synchronize: false,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
