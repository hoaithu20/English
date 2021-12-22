declare const _default: () => {
    port: number;
    databaseConfig: {
        host: string;
        port: number;
        username: string;
        password: string;
        type: string;
        database: string;
        entities: string[];
        synchronize: boolean;
        migrations: string[];
        factories: string[];
        seeds: string[];
        logging: boolean;
    };
    httpConfig: {
        timeout: number;
    };
    authConfig: {
        secretKey: string;
        saltOrRounds: string;
    };
    questionConfig: {
        maxPoint: number;
    };
};
export default _default;
