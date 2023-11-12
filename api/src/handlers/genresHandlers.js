const { createGenresDb } = require("../controllers/genresControllers");
const { genre } = require("../db");

const getGenresHandler = async (req, res) => {
  try {
    const genresInDb = await createGenresDb();
    res.status(200).json(genresInDb);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getGenresHandler,
};
