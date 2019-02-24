import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router } from './router';
import db from './models/index';
import { errorHandler, AuthError } from './middlewares/error-handler';
import passport from 'koa-passport';
import jwt from 'jwt-then';
import { config } from '../config/config';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { authByToken } from './auth';
import { runtimeLogger } from './logger';

// 执行passport.authenticate会执行这堆内容
// 约定了只能这么传{"username":1,"password":13}, 或者额外定义
// 所以确定了这里是login的逻辑, 校验用的
// cb的第二个参数会传给passport.authenticate的第二个参数
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(
        {
            // or whatever you want to use
            usernameField: 'username', // define the parameter in req.body that passport can use as username and password
            passwordField: 'password',
        },
        async function(username, pass, cb) {
            try {
                const user = await db.User.findOne({
                    where: { name: username },
                });
                if (user.password === pass) {
                    const token = await jwt.sign(
                        { id: user.id },
                        config.jwtSecret
                    );
                    cb(null, token);
                } else {
                    cb(new AuthError('username or password invalid'), false);
                }
            } catch (error) {
                cb(error, false);
            }
        }
    )
);

passport.use(
    new BearerStrategy(async function(token, cb) {
        try {
            const { id } = await jwt.verify(token, config.jwtSecret);
            // 过期的逻辑在这里处理
            cb(null, id);
        } catch (error) {
            if (error.message === 'invalid token') {
                cb(null, false);
            } else {
                throw error;
            }
        }
    })
);

async function main() {
    // await db.authenticate();
    const app = new Koa();

    app.use(bodyParser());
    app.use(errorHandler());

    app.use(passport.initialize());
    // app.use(passport.session());

    // 需要一个全局包装数据的中间件
    app.use(async (ctx, next) => {
        await next();

        const body: any = {
            code: 2000,
            msg: 'OK',
            env: process.env.NODE_ENV,
        };

        const data = ctx.body || '';
        body.data = data;

        if (data.pagination !== undefined) {
            body.pagination = data.pagination;
            delete body.data.pagination;
        }

        ctx.body = body;
    });

    // 对特定路由进行鉴权
    app.use(authByToken);

    app.use(router.routes());

    app.on('error', (err, ctx) => {
        runtimeLogger.error(JSON.stringify(err));
    });

    console.log(process.env.NODE_ENV)
    app.listen(5000);
}

main();
