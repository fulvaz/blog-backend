import passport from 'koa-passport';
import { AuthError } from '../middlewares/error-handler';
import { reject } from 'bluebird';

export class AuthController {
    public static async login(ctx, next) {
        const token = await AuthController.auth(ctx, next);
        ctx.body = token;
        await next();
    }

    public static auth(ctx, next) {
        return new Promise((resolve, reject) => {
            passport.authenticate('local', async (err, token, info, status) => {
                if (err) {
                    reject(err);
                }
                if (token) {
                    resolve(token);
                } else {
                    reject(new AuthError(info.message));
                }
            })(ctx, next);
        })
    }
}
