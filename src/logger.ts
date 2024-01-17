import { Request, Response, NextFunction } from 'express';
import winston, { format, transports } from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(new transports.File({ filename: 'error.log', level: 'error' }));

logger.add(new transports.Console({ level: 'debug' }));

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = new Date().getTime();
  
    logger.info(`Incoming Request - Method: ${req.method}, Path: ${req.path}`);
  
    res.on('finish', () => {
      const responseTime = new Date().getTime() - start;
      logger.info(`Request handled - Method: ${req.method}, Path: ${req.path}, Response Time: ${responseTime}ms`);
    });
  
    next();
};