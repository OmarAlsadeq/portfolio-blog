import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

// Initialize Sequelize with MySQL2 dialect module
const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2,
  }
);

// Export the initialized Sequelize instance
export default sequelize;
