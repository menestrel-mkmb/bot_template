import * as Joi from 'joi';

import { Service } from '../../tokens';
import { Config } from '../model';

export const configProvider = {

    provide: Service.CONFIG,
    useFactory: (): Config => {

        const env = process.env;
        const validationSchema = Joi.object<Config>().unknown().keys({
            API_PORT: Joi.number().required(),
            API_PREFIX: Joi.string().required(),
            SWAGGER_ENABLE: Joi.number().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_ISSUER: Joi.string().required(),
            HEALTH_TOKEN: Joi.string().required(),
            PASSENGERS_ALLOWED: Joi.string().valid('yes', 'no').required(),
            DISCORD_BOT_TOKEN: Joi.string().required()
        });

        const result = validationSchema.validate(env, {
            abortEarly: false
        });
        if (result.error) {
            const errorMsgs = result.error.details.map(detail => detail.message);
            throw new Error(`Configuration not valid: ${errorMsgs.join(', ')}`);
        }

        return result.value;
    }

};
