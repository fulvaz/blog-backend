import { env } from '../../config/config';
import { runtimeLogger, articleLogger, securityLogger } from '../logger';



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

export class NotFoundError extends Error {
    code = 4004;
    status = 404;
    defaultValue: any;
}

// koa要求async内的每个next都要带上await
// 非async要带上return, 否则不能正常捕获错误
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
                securityLogger.info(error.message);
                ctx.body = {
                    code: error.code,
                    msg: error.message,
                    data: error.defaultValue,
                }
                ctx.status = error.status;
            } else if (error instanceof NotFoundError) {
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