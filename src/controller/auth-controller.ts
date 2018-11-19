import passport from 'koa-passport';
import { AuthError } from '../middlewares/error-handler';

export class AuthController {
    public static async login(ctx, next) {
        return passport.authenticate('local', (err, token, info, status) => {
            if (token) {
                ctx.body = token;
            }
        })(ctx, next);
    }

    public static authByToken(ctx, next) {
        return passport.authenticate('bearer', (err, userId, info, status) => {
            if (userId) {
                ctx.state.userId = userId;
                next();
            } else {
                ctx.body = '';
                // TODO: 应该有多种提示
                throw new AuthError('invalid user');
            }
        })(ctx, next);
    }
}