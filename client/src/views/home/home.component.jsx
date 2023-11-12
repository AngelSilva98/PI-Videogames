import Navbar from "../../components/navbar/navbar.component";
import CardList from "../../components/cardList/cardList.component";
import Paginado from "../../components/paginado/paginado.component";
import Header from "../../components/header/header.component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  getGamesByName,
  clearMessage,
  getGenres,
  filterByGenre,
  filterByBD,
  orderByName,
} from "../../redux/actions/actions";

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const [filtered, setFiltered] = useState([]);
  const [searchString, setSearchString] = useState("");
  const messageError = useSelector((state) => state.message);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGame = filtered.slice(indexOfFirstGame, indexOfLastGame);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const allGenres = useSelector((state) => state.allGenres);
  const [order, setOrder] = useState("");

  console.log("todos los juegosss", allGames);

  useEffect(() => {
    if (!allGames.length) {
      dispatch(getGames());
    }
    if (messageError !== "") {
      alert(messageError);
      dispatch(clearMessage());
    }
    if (!allGenres.length) {
      dispatch(getGenres());
    }
    setFiltered(allGames);
  }, [dispatch, allGames, messageError, allGenres]);

  const handlerChange = (event) => {
    setSearchString(event.target.value.toLowerCase());
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(getGamesByName(searchString));
    setFiltered(allGames);
  };

  const handlerFilterGenre = (event) => {
    dispatch(filterByGenre(event.target.value));
    setCurrentPage(1);
  };

  const handlerFilterBd = (event) => {
    dispatch(filterByBD(event.target.value));
  };

  const handlerSort = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  };

  const handlerGetAllGames = () => {
    dispatch(getGames());
  };

  return (
    <div>
      <Header />
      <Navbar handlerSubmits={handlerSubmit} handlerChanges={handlerChange} />
      <div>
        <select onChange={(event) => handlerSort(event)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={(event) => handlerFilterGenre(event)}>
          <option value="All">Todos</option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <select onChange={(event) => handlerFilterBd(event)}>
          <option value="Bd">Creado</option>
          <option value="Api">Api</option>
        </select>
        <button onClick={handlerGetAllGames}>Cargar todos los juegos</button>
        <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
      </div>
      <CardList allGames={currentGame} />
    </div>
  );
}

export default Home;
