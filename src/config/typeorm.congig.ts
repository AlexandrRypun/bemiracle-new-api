import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'bemiracle',
    password: '123456',
    database: 'bemiracle',
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    synchronize: true
};
