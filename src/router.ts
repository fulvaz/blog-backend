import Router from 'koa-router';
import { ArticlesController } from './controller/articles-controller';
import { AuthController } from './controller/auth-controller';

export const router = new Router();

router.get('/article/:id', ArticlesController.get);
router.post('/article', ArticlesController.create);
router.put('/article/:id', ArticlesController.update);
router.delete('/article/:id', ArticlesController.delete);
router.get('/articles', ArticlesController.getAll);
router.post('/login', AuthController.login);
router.get('/needAuth', AuthController.authByToken, (ctx, next) => {
    // 会破坏koa的流程, 直接跳出去, 不再执行接下来的流程
        ctx.body = '校验通过';
        next();
});
router.get('/err/local', (ctx, next) => {
    // try {
    //     throw new Error('business err');
    // } catch(e) {
    //     ctx.body = e.message;
    //     ctx.status = 400;
    //     ctx.
    // }
});

