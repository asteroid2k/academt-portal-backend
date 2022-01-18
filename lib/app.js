const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const router = require("./router");

const app = express();

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.use("/api", router);

module.exports = app;
