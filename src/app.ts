import * as dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import Controller from "./Modules/interfaces/controller.interface";
import errorMiddleware from "./Modules/middleware/error.middleware";
import mongoose = require("mongoose");

import cors from "cors";
import helmet from "helmet";

class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.connectToTheDatabase();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    dotenv.config();
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose
      .connect(`${process.env.DATABASE_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => {
        console.log("DB is connected");
      })
      .catch((err) => console.log("DB is not connected"));
  }
}

export default App;
