const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const router = require("./router");

const app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.use("/api", router);

module.exports = app;
