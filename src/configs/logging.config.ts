import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

const errorStackTracerFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

export const LoggingConfig = () => {
  return WinstonModule.createLogger({
    format: winston.format.combine(
      winston.format.splat(),
      errorStackTracerFormat(),
      winston.format.simple(),
    ),
    // options
    transports: [
      new winston.transports.File({
        filename: 'application-error.log',
        level: 'error',
      }),
      new winston.transports.File({
        filename: 'application-debug.log',
        level: 'debug',
      }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      // new WinstonCloudwatch({
      //     level: 'error',
      //     retentionInDays: 30,
      //     logGroupName: 'nft-market-api',
      //     logStreamName: function () {
      //         // Spread log streams across dates as the server stays up
      //         const date = new Date().toISOString().split('T')[0];
      //         return 'nft-market-api-' + date;
      //     },
      //     awsRegion: 'ap-southeast-1',
      //     jsonMessage: false,
      // }),
    ],
  });
};
