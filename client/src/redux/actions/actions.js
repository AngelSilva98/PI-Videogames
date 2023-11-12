import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const ERROR = "ERROR";
export const CLEAN_MESSAGE = "CLEAN_MESSAGE";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_BD = "FILTER_BY_BD";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_DETAIL = "GET_DETAIL";
export const ORDER_BY_NAME = " ORDER_BY_NAME";

export function getGames() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogames`);
    return dispatch({
      type: "GET_GAMES",
      payload: response.data,
    });
  };
}

export function getGamesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_GAMES_BY_NAME",
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  };
}

export function clearMessage() {
  return function (dispatch) {
    return dispatch({
      type: "CLEAN_MESSAGE",
    });
  };
}

export function createGame(payload) {
  console.log("soy el payloadddd", payload);
  return async function (dispatch) {
    const response = await axios.post(
      `http://localhost:3001/videogames`,
      payload
    );
    console.log("Este es el response del post", response);
    return dispatch({
      type: "CREATE_VIDEOGAME",
      payload: response.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/genres`);
    return dispatch({
      type: "GET_GENRES",
      payload: response.data,
    });
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterByBD(payload) {
  return {
    type: "FILTER_BY_BD",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      return dispatch({
        type: "GET_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR",
        payload: error.responser,
      });
    }
  };
}
