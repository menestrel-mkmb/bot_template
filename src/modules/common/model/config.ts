export interface Config {

    readonly NODE_ENV: string;

    readonly API_PORT: number;
    readonly API_PREFIX: string;

    readonly SWAGGER_ENABLE: number;

    readonly POSTGRES_DB: string;
    readonly POSTGRES_URL: string;
    readonly POSTGRES_PORT: number;
    readonly POSTGRES_USER: string;
    readonly POSTGRES_PASSWORD: string;

    readonly DISCORD_BOT_TOKEN: string;

    readonly JWT_SECRET: string;
    readonly JWT_ISSUER: string;

    readonly HEALTH_TOKEN: string;

    readonly PASSENGERS_ALLOWED: string;

}
