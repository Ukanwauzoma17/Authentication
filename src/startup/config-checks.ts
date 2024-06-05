import "dotenv/config";

/**
 * This function checks if all the required environment variables are set.
 */
export default function () {
  const {
    DB_PORT,
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_USER
    // MAIL_USER,
    // MAIL_PASS,
    // MAIL_HOST,
  } = process.env;

  // Check for MySql Connection parameters like port, host, user, password, database
  if (!DB_PORT) {
    throw new Error("FATAL ERROR: DB_PORT is not defined");
  }

  if (!DB_USER) {
    throw new Error("FATAL ERROR: DB_USER is not defined");
  }

  if (!DB_HOST) {
    throw new Error("FATAL ERROR: DB_HOST is not defined");
  }

  if (!DB_DATABASE) {
    throw new Error("FATAL ERROR: DB_DATABASE is not defined");
  }

  if (!DB_PASSWORD) {
    throw new Error("FATAL ERROR: DB_PASSWORD is not defined");
  }
  // if (!MAIL_USER) {
  //   throw new Error("FATAL ERROR: MAIL_USER is not defined");
  // }
  // if (!MAIL_PASS) {
  //   throw new Error("FATAL ERROR: MAIL_PASS is not defined");
  // }
  // if (!MAIL_HOST) {
  //   throw new Error("FATAL ERROR: MAIL_HOST is not defined");
  // }
}
