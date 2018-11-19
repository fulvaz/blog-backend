import { env } from '../config/config';
import log4js from 'log4js';
log4js.configure({
    appenders: {
        businessErr: {
            type: 'file',
            filename: '/var/log/blog/business.log'
        },
        runtimeErr: {
            type: 'file',
            filename: '/var/log/blog/runtime.log'
        },
        out: { type: 'stdout' },
    },
    categories: {
        article: {
            appenders: ['businessErr', 'out'],
            level: 'info'
        },
        business: {
            appenders: ['businessErr', 'out'],
            level: 'info'
        },
        runtime: {
            appenders: ['runtimeErr', 'out'],
            level: 'error'
        },
    }
});

export const articleLogger = log4js.getLogger('article');
export const runtimeLogger = log4js.getLogger('runtime');