import Router from 'koa-router';
import { ArticlesController } from './controller/articles-controller';
import { AuthController } from './controller/auth-controller';
import { NotFoundError } from './middlewares/error-handler';

export const router = new Router();

router.get('/article/:id', ArticlesController.get);
router.post('/article', ArticlesController.create);
router.put('/article/:id', ArticlesController.update);
router.delete('/article/:id', ArticlesController.delete);
router.get('/articles', ArticlesController.getAll);
router.post('/login', AuthController.login);
router.all('*', async (ctx, next) => {
    throw new NotFoundError('cc');
});


