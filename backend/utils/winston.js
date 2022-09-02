const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const {combine, timestamp, printf} = winston.format;

const logDir = 'logs';


const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
})

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat,
    ),
    transports:[
        new winstonDaily({
            level:'info',
            datePattern:'YYYY-MM-DD',
            dirname:logDir,
            filename:`%DATE%.log`,
            maxFiles:14,
            zippedArchive:true
        }),
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.splat(),
                winston.format.colorize({all:true})
            )
        })
    ]
})

module.exports = { logger };