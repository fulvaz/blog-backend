import { env, config } from '../config/config';
import {resolve} from 'path';
import log4js from 'log4js';
log4js.configure({
    appenders: {
        businessErr: {
            type: 'file',
            // filename: '/var/logs/business.log',
            filename: resolve(config.logPath, 'business.log'),
        },
        securityInfo: {
            type: 'file',
            // filename: '/var/logs/security.log',
            filename: resolve(config.logPath, 'security.log'),
        },
        runtimeErr: {
            type: 'file',
            // filename: '/var/logs/error.log',
            filename: resolve(config.logPath, 'runtime.log'),
        },
        out: { type: 'stdout' },
    },
    categories: {
        default: { appenders: ['out'], level: 'info'},
        article: {
            appenders: ['businessErr', 'out'],
            level: 'info'
        },
        security: {
            appenders: ['securityInfo', 'out'],
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
export const securityLogger = log4js.getLogger('security');