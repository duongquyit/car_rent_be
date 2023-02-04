export const LOG_FILE_MAX = parseInt(process.env.LOG_FILE_MAX);
export const LOG_DIR = process.env.LOG_DIR || 'logs';
export const LOG_FILE_NAME = `${process.env.NODE_ENV}-%DATE%.log`;
