require("dotenv/config");
/**
 * This is only meant to be used by the sequelize-cli
 */
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;

module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: "mysql",
  },
  test: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: "mysql",
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: "postgres",
  },
};
