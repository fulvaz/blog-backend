import Router from 'koa-router';
import { ArticlesController } from './controller/articles-controller';

export const router = new Router();

router.get('/article/:id', ArticlesController.get);
router.post('/article', ArticlesController.create);
router.put('/article/:id', ArticlesController.update);
router.delete('/article/:id', ArticlesController.delete);
router.get('/articles', ArticlesController.getAll);
router.get('/err/global', (ctx, next) => {
    // 会破坏koa的流程, 直接跳出去, 不再执行接下来的流程
    throw new Error('custom err');
});
router.get('/err/local', (ctx, next) => {
    try {
        throw new Error('business err');
    } catch(e) {
        ctx.body = e.message;
        ctx.status = 400;
        ctx.
    }
});

