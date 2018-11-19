import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router } from './router';
import db from './models/index';
import { env } from '../config/config';
import { RuntimeError, errorHandler } from './middlewares/error-handler';


async function main() {
    // await db.authenticate();
    const app = new Koa();

    app.use(errorHandler());

    app.use(bodyParser({
        enableTypes: ['json'],
    }));
    app.use(router.routes());
    // 需要一个全局包装数据的中间件
    app.use(async (ctx, next) => {
        await next();
        ctx.body = {
            code: 2000,
            msg: 'OK',
            data: ctx.body || '',
        };
    });

    app.on('error', (err, ctx) => {
        console.dir(err);
    });

    app.listen(3000);
}

main();
