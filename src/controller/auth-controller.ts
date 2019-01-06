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
}
