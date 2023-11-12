const { videogames, genre } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_KEY } = process.env;

const createVideoGameDB = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genres
) => {
  const newVideoGame = await videogames.create({
    name,
    description,
    platforms: platforms.join(", "),
    image,
    released,
    rating,
    genress: genres,
  });

  console.log(genres);
  // if (genres && genres.length > 0) {
  //   const genrePrueba = await genre.findAll({
  //     where: {
  //       name: genres,
  //     },
  //   });
  //   await newVideoGame.setGenres(genrePrueba);
  // }

  return newVideoGame;
};

const getVideoGamesDB = async () => {
  const allGamesDb = await videogames.findAll();
  return allGamesDb;
};

const bringAllgamesApi = async () => {
  let currentPage = 1;
  let allGames = [];
  const gamesPerPAge = 20;

  while (allGames.length < 100) {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=${gamesPerPAge}`
    );

    const response = data.results.map((game) => {
      const mapApi = {
        id: game.id,
        name: game.name,
        image: game.background_image,
        description: game.description,
        platforms: game.platforms.map((el) => el.platform.name),
        released: game.released,
        rating: game.rating,
        genres: game.genres.map((gen) => gen.name),
        created: false,
      };
      return mapApi;
    });
    allGames = allGames.concat(response);
    currentPage++;
  }

  return allGames.slice(0, 100);
};
const getAllVideoGames = async (name) => {
  const videoGamesDB = await getVideoGamesDB(); // todos los usarios de la db
  const videoGamesApi = await bringAllgamesApi(); // todos los usuarios de la api
  const allVideoGames = [...videoGamesDB, ...videoGamesApi];

  if (name) {
    let filterGame = allVideoGames.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filterGame.length) {
      return filterGame;
    }
    throw new Error("No se encontró un juego con ese nombre");
  } else {
    return allVideoGames;
  }

  // todos los games
};

const getVideoGameById = async (id) => {
  if (isNaN(id)) {
    const game = await videogames.findByPk(id);
    return game;
  }
  const game = (
    await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
  ).data;
  return game;
};

module.exports = {
  createVideoGameDB,
  getAllVideoGames,
  bringAllgamesApi,
  getVideoGameById,
};
