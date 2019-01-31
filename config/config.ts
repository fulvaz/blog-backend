export const env = process.env.NODE_ENV || 'development';
interface Config {
    jwtSecret: string,
    logPath: string,
}


export const config: Config = {
    development: {
        jwtSecret: 'TEST',
        logPath: './log'
    },
    test: {

    },
    production: {

    }
}[env];
