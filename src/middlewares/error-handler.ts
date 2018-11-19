import { env } from '../../config/config';
import { runtimeLogger, articleLogger } from '../logger';



export class RuntimeError extends Error {

}

export class BusinessError extends Error {
    code = 5000;
    status = 502;
    defaultValue: any;
}

export class AuthError extends Error {
    code = 4003;
    status = 403;
    defaultValue: any;
}

export function errorHandler(param?) {
    return async function (ctx, next) {
        try {
            await next();
        } catch (error) {
            if (error instanceof BusinessError) {
                articleLogger.info(error.message);
                ctx.body = {
                    code: error.code,
                    msg: error.message,
                    data: error.defaultValue,
                }
                ctx.status = error.status || 200;
            } else if (error instanceof AuthError) {
                ctx.body = {
                    code: error.code,
                    msg: error.message,
                    data: error.defaultValue,
                }
                ctx.status = error.status;
            } else {
                // 默认就是RuntimeError啊!
                runtimeLogger.error(error.message);
                ctx.body = {
                    code: 5000,
                    msg: 'Internal server error',
                    data: null,
                };
                ctx.status = 502;
            }

            if (env !== 'production') {
                const { message, stack } = error;
                ctx.body.debug = {
                    message,
                    stack,
                };
            }
            ctx.app.emit('error', error, ctx);
        }
    }
}