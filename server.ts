import express from "express";
import routes from "./src/startup/routes";
import sequelize from "./src/startup/db";
import configChecks from "./src/startup/config-checks";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// We need to make sure all environment variables are loaded
configChecks();


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
    // // We need to stop running the app if we can't connect to the database
    process.exit(1);
  });

sequelize.sync();

// Now we need to tell our  app to use the routes we just created.
// We can do this by importing the routes file and calling the function with the app instance.
routes(app);

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} and environment is set to ${process.env.NODE_ENV}`
  );
});
