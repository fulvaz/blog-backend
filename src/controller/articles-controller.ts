import db from '../models/index.js';
import { BusinessError } from '../middlewares/error-handler';

export class ArticlesController {
    public static async get(ctx, next) {
        next(new BusinessError('b'));
        let result = await db.Article.findById(ctx.params.id);
        ctx.body = result;
    }

    public static async getAll(ctx, next) {
        // from 6 -> 10
        // Project.findAll({ offset: 5, limit: 5 })
        let {page = 1, size = 10} = ctx.request.query;
        page = parseInt(page, 10);
        size = parseInt(size, 10);
        const total = await  db.Article.count();
        ctx.body = await db.Article.findAll({
            offset: (page - 1) * size,
            limit: size,
        });
        ctx.body.pagination = {
            page,
            size,
            total,
        };
        await next();
    }

    public static async create(ctx, next) {
        const body = ctx.request.body;
        const article = await db.Article.create(body);
        ctx.body = article
        await next();
    }

    public static async update(ctx, next) {
        const body = ctx.request.body;
        // 拿到的是一个task, 但是序列化后是一个数据
        const article = await db.Article.findById(parseInt(ctx.params.id, 10));
        article.update(body);
        ctx.body = article;
        await next();
    }

    public static async delete(ctx, next) {
        const id = ctx.params.id;
        const article = await db.Article.findById(parseInt(id, 10));
        article.destroy();
        await next();
    }
}