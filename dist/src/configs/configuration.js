"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    databaseConfig: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        type: process.env.DB_CONNECTION || 'mysql',
        database: process.env.DB_DATABASE || '',
        entities: ['dist/**/*.entity{ .ts,.js}'],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        migrations: ['dist/migrations/*.js'],
        factories: ['dist/migrations/factories/*.factory{.ts,.js}'],
        seeds: ['dist/migrations/seeders/*.seed{.ts,.js}'],
        logging: true,
    },
    httpConfig: {
        timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 30000,
    },
    authConfig: {
        secretKey: process.env.SECRET_KEY,
        saltOrRounds: process.env.SALT_OR_ROUNDS,
    },
    questionConfig: {
        maxPoint: parseInt(process.env.MAX_POINT)
    }
});
//# sourceMappingURL=configuration.js.map