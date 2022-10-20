import { Sequelize } from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config/env';
import { logger } from '@/utils/logger';

const sequelize = new Sequelize(String(DB_DATABASE), String(DB_USER), String(DB_PASSWORD), {
  dialect: 'postgres',
  host: String(DB_HOST),
  port: Number(DB_PORT),
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: false,
    freezeTableName: true,
    paranoid: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

export { sequelize };
