const {VAR_DB_USERNAME, VAR_DB_PASSWORD, VAR_DB_HOST} = process.env;

module.exports = {
    development: {
        username: VAR_DB_USERNAME,
        password: VAR_DB_PASSWORD,
        database: 'blog_dev',
        host: VAR_DB_HOST,
        dialect: 'mysql',
    },
    test: {
        username: VAR_DB_USERNAME,
        password: VAR_DB_PASSWORD,
        database: 'blog_test',
        host: VAR_DB_HOST,
        dialect: 'mysql',
    },
    production: {
        username: VAR_DB_USERNAME,
        password: VAR_DB_PASSWORD,
        database: 'blog_production',
        host: VAR_DB_HOST,
        dialect: 'mysql',
    },
};
