import {
  GET_GAMES,
  GET_GAMES_BY_NAME,
  ERROR,
  CLEAN_MESSAGE,
  GET_GENRES,
  FILTER_BY_GENRE,
  FILTER_BY_BD,
  POST_VIDEOGAME,
  GET_DETAIL,
  ORDER_BY_NAME,
} from "../actions/actions";

let initialState = {
  allGames: [],
  allGamesCopy: [],
  message: "",
  allGenres: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allGamesCopy: [...action.payload],
      };
    case GET_GAMES_BY_NAME:
      return {
        ...state,
        allGames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };

    case FILTER_BY_GENRE:
      const allGames = state.allGamesCopy;
      const genreFiltered =
        action.payload === "All"
          ? allGames
          : allGames.filter(
              (element) =>
                element.genres && element.genres.includes(action.payload)
            );
      return {
        ...state,
        allGames: genreFiltered,
      };

    case FILTER_BY_BD:
      const all_Games = state.allGamesCopy;
      const BdFilter =
        action.payload === "Bd"
          ? all_Games.filter((element) => element.created)
          : all_Games.filter((element) => !element.created);
      return {
        ...state,
        allGames: action.payload === "All" ? state.allGames : BdFilter,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ORDER_BY_NAME:
      const sortedArr =
        action.payload === "asc"
          ? state.allGames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.allGames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allGames: sortedArr,
      };

    case ERROR:
      return {
        ...state,
        message: action.payload,
      };

    case CLEAN_MESSAGE:
      return {
        ...state,
        message: "",
      };

    case POST_VIDEOGAME:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
