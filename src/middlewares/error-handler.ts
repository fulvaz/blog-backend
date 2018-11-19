import { env } from '../../config/config';
import { runtimeLogger, articleLogger } from '../logger';



export class RuntimeError extends Error {

}

export class BusinessError extends Error {
    code = 5000;
    defaultValue: any;
}

export function errorHandler(param?) {
    return async function (ctx, next) {
        try {
            await next();
        } catch (error) {
            if (error instanceof RuntimeError) {
                runtimeLogger.error(error.message);
                ctx.body = {
                    code: 5000,
                    msg: 'Internal server error',
                    data: null,
                };
                ctx.status = 502;
            }

            if (error instanceof BusinessError) {
                articleLogger.info(error.message);
                ctx.body = {
                    code: error.code || 5000,
                    msg: error.message,
                    data: error.defaultValue || null,
                }
                ctx.status = 200;
            }

            if (env !== 'production') {
                ctx.body.debug = {
                    ...error,
                };
            }




            ctx.app.emit('error', error, ctx);
        }
    }
}