const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const middlewares = jsonServer.defaults();

const articles = require('./data');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use((req, res, next) => {
    let { page, size } = req.query;
    if (page) {
        page = parseInt(page, 10);
    }
    if (size) {
        size = parseInt(size, 10);
    }
    req.query.page = page;
    req.query.size = size;
    next();
});
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get('/articles', (req, res) => {
    const { page = 1, size = 10 } = req.query;
    res.jsonp({
        code: 2000,
        data: articles.slice((page - 1) * size, page * size),
        msg: 2000,
        total: articles.length,
        page,
        size,
    });
});
server.get('/article/:title', (req, res) => {
    const { title } = req.params;
    const data = articles.find(e => e.title === title);

    if (!data) {
        res.jsonp({
            code: 2000,
            data: 'not found!',
            msg: 2000,
        });
    } else {
        res.jsonp({
            code: 2000,
            data,
            msg: 2000,
        });
    }
});

// Use default router
server.listen(5000, () => {
    console.log('JSON Server is running');
});
