import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { constants } from '../constants';

const options: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: constants.mongo_url,
    database: constants.mongo_database,
    logging: true,
    synchronize: true, 
    useNewUrlParser: true,
    entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
    migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
    subscribers: [path.resolve(__dirname, '..', 'db', 'subscribers', '*')],
};

module.exports = options;