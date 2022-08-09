const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { allRoutes } = require("./router/router");

//TODO                                      SERVER

module.exports = class Application {
  constructor(PORT, DB_URL) {
    this.configDataBase(DB_URL);
    this.configApplication();
    this.configSwagger();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandeler();
  }

  //TODO                                     Config Express

  configApplication() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use((req, res, next) => {
      console.log(`http://localhost:3000${req.url}`);
      next();
    });
  }

  //TODO                                     Gonfig Swagger

  configSwagger() {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Library API",
          version: "1.0.0",
          description: "A simple Express Library",
        },

        servers: [
          {
            url: "http://localhost:3000",
            description: "My API",
          },
        ],
      },
      apis: [
        "./app/swagger/Users/*.js",
        "./app/swagger/Teams/*.js",
        "./app/swagger/Projects/*.js",
        "./app/swagger/Auth/*.js",
        "./app/swagger/Swagger_Components/*.js",
        "./app/swagger/Swagger_Tags/*.js",
      ],
    };

    const specs = swaggerJSDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  }

  //TODO                                     Making Server And Run It

  createServer(PORT) {
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server > Started On http://localhost:${PORT} ...`);
    });
  }

  //TODO                                     Connecting To DataBase

  configDataBase(DB_URL) {
    mongoose.connect(DB_URL, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Connected To DataBase...`);
      }
    });
  }

  //TODO                                      Handeling Errors

  errorHandeler() {
    app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "page not found",
      });
    });
    app.use((err, req, res, next) => {
      const status = err?.status || 500;
      const message = err?.message || "enternal server error";
      return res.status(status).json({
        status,
        data: null,
        message,
      });
    });
  }

  //TODO                                                         Create Routes

  createRoutes() {
    app.get("/", (req, res, next) => {
      return res.json({
        status: 200,
        message: "home page",
      });
    });
    app.use(allRoutes);
    // app.use((err , req, res, next) => {
    //   try {

    //   } catch (error) {
    //     console.log(error);
    //     next(error);
    //   }
    // });
  }
};
