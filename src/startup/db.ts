import  dotenv  from 'dotenv';
import { NodeEnvironment } from "./../utils/types";
// import "dotenv/config";
import { Sequelize } from "sequelize-typescript";

import { setting } from "../config/db";
import User from "../users/user-model";
import OTP from "../otp/otp-model";
import Token from '../token/token-model';

// Importing models from Users module

dotenv.config();

const env = process.env.NODE_ENV as NodeEnvironment;
const config = setting[env];

/**
 * Models would be loaded manually. This is because of the modelMatch option in the sequelize constructor
 * @see [Sequelize-Typescript](https://www.npmjs.com/package/sequelize-typescript#model-path-resolving)
 */

const connString = `${config.dialect}://${config.username}:${config.password}@${config.host}/${config.database}`;

const sequelize = new Sequelize(connString, {
  models: [
    User,
    OTP,
    Token
  ],
});

export default sequelize;
