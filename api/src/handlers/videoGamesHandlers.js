const { response } = require("express");
const {
  createVideoGameDB,
  getVideoGameById,
  bringAllgamesApi,
  getAllVideoGames,
} = require("../controllers/videogamesControllers");

const getvideoGameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await getAllVideoGames(name);
      return res.status(200).json(response);
    } else {
      const response = await getAllVideoGames();
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideoGamesByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getVideoGameById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postVideoGamesHandler = async (req, res) => {
  const { name, description, platforms, image, released, rating, genres } =
    req.body;
  try {
    const response = await createVideoGameDB(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getvideoGameHandler,
  getVideoGamesByIdHandler,
  postVideoGamesHandler,
};
