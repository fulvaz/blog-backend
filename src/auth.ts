import passport from 'koa-passport';
import { AuthError } from './middlewares/error-handler';
import db from './models/index';

export async function authByToken(ctx, next) {
    const authPaths = [
        { path: '^/article', method: 'POST' },
        { path: '^/article', method: 'DELETE' },
        { path: '^/article', method: 'PUT' },
    ];

    const ifNeedAuth = authPaths.find(e => {
        const regExp = new RegExp(e.path);
        return e.method === ctx.request.method && regExp.test(ctx.request.url);
    });

    if (!ifNeedAuth) {
        await next();
    } else {
        await auth(ctx, next);
        await next();
    }
}

function auth(ctx, next) {
    return new Promise((resolve, reject) => {
        passport.authenticate('bearer', async (err, userId, info, status) => {
          
            if (userId) {
                const user = await db.User.findOne({
                    where: { id: userId },
                });
                if (user) {
                    ctx.state.userId = userId;
                    resolve();
                } else {
                  reject(new AuthError('invalid user'));
                }
            } else {
                reject(new AuthError('invalid user'));
            }
        })(ctx, next);
    });
}
