const { Router } = require("express");
const {
  getvideoGameHandler,
  getVideoGamesByIdHandler,
  postVideoGamesHandler,
} = require("../handlers/videoGamesHandlers.js");

const videoGameRouter = Router();

videoGameRouter.get("/", getvideoGameHandler);

//params
videoGameRouter.get("/:id", getVideoGamesByIdHandler);

//post

videoGameRouter.post("/", postVideoGamesHandler);

module.exports = videoGameRouter;
