import { Service } from '../../tokens';
import { Config } from '../model';

export const configProvider = {

    provide: Service.CONFIG,
    useFactory: (): Config => {

        const env = process.env;

        return {
            NODE_ENV: env.NODE_ENV || "development",

            API_PORT: Number(env.API_PORT) || 3000,
            API_PREFIX: env.API_PREFIX || 'api',

            SWAGGER_ENABLE: Number(env.SWAGGER_ENABLE) || 1,

            POSTGRES_DB: env.POSTGRES_DB || 'necord',
            POSTGRES_URL: env.POSTGRES_URL || 'localhost',
            POSTGRES_PORT: Number(env.POSTGRES_PORT) || 5432,
            POSTGRES_USER: env.POSTGRES_USER || 'necord',
            POSTGRES_PASSWORD: env.POSTGRES_PASSWORD || 'password',

            DISCORD_BOT_TOKEN: env.DISCORD_BOT_TOKEN || 'SecretToBeFilled.andboy.itsugly',

            JWT_SECRET: env.JWT_SECRET || 'secret',
            JWT_ISSUER: env.JWT_ISSUER || 'necord',

            HEALTH_TOKEN: env.HEALTH_TOKEN || 'secret',

            PASSENGERS_ALLOWED: env.PASSENGERS_ALLOWED || 'yes',
        };
    }

};
