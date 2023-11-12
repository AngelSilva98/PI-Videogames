const { genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const genresApi = async () => {
  const { data } = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );

  const response = data.results.map((element) => {
    const mapGenres = {
      id: element.id,
      name: element.name,
    };
    return mapGenres;
  });
  return response;
};

const createGenresDb = async () => {
  const allGenresApi = await genresApi();
  const createdGenres = [];
  for (const genreData of allGenresApi) {
    //desestructuramos el array para asignar los valores devueltos por el findorcreate
    const [genres, created] = await genre.findOrCreate({
      where: { id: genreData.id },
      defaults: {
        name: genreData.name,
      },
    });

    createdGenres.push(genres);
  }

  return createdGenres;
};

module.exports = {
  genresApi,
  createGenresDb,
};
