import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createGame, getGenres } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header.component";

import "./create.style.css";

function Create() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    genres: [],
  });

  const [error, setError] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
    released: "",
    rating: "",
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const validate = (input) => {
    let error = {};

    if (input.name === "" || input.name[0].trim().length === 0) {
      error.name = "Ingrese un nombre por favor";
    }
    if (input.image === "" || input.image[0].trim().length === 0) {
      error.image = "ingrese un link válido";
    }
    if (input.description === "" || input.description[0].trim().length === 0) {
      error.description = "Ingrese una descripcion por favor";
    }
    if (input.platforms.length === 0) {
      error.platforms = "seleccione la o las plataformas";
    }
    if (input.released === "") {
      error.released = "Ingrese una fecha de lanzamiento";
    }

    if (input.rating < 0 || input.rating >= 6) {
      error.rating = "ingrese rating del juego entre 0 y 5";
    }

    return error;
  };

  const handlerChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setError(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handlerCheck = (event) => {
    if (event.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, event.target.value],
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(createGame(input));
      alert("Videojuego Creado correctamente");
      setInput({
        name: "",
        image: "",
        description: "",
        platforms: [],
        released: "",
        rating: "",
        genres: [],
      });
      history.push("/home");
    } else {
      alert("faltan datos");
    }
  };
  const handlerSelect = (event) => {
    setInput({
      ...input,
      platforms: [...input.platforms, event.target.value],
    });
  };

  console.log(input);

  return (
    <div>
      <Header />
      <div className="form-container">
        <div className="background-form">
          <h1 className="titulo-form">Crea tu Video Game</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label-form">Nombre: </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handlerChange}
              />
              <p className="error-form">{error.name && error.name}</p>
            </div>
            <div>
              <label className="label-form">Imagen: </label>
              <input
                name="image"
                value={input.image}
                onChange={handlerChange}
              />
              <p className="error-form">{error.image && error.image}</p>
            </div>
            <div>
              <label className="label-form">Descripción: </label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handlerChange}
              />
              <p className="error-form">
                {error.description && error.description}
              </p>
            </div>
            <div>
              <p className="form-plataforma">Seleccione la plataforma</p>
              <select onChange={handlerSelect}>
                <option value="pc">PC</option>
                <option value="playstation">PlayStation</option>
                <option value="xbox">XBOX</option>
              </select>
              <p className="error-form">{error.platforms && error.platforms}</p>
              <ul className="lista-platforms">
                <li>{input.platforms.map((element) => element + ", ")}</li>
              </ul>
            </div>
            <div>
              <label className="label-form">Fecha de lanzamiento: </label>
              <input
                type="date"
                name="released"
                value={input.released}
                onChange={handlerChange}
              />
              <p className="error-form">{error.released && error.released}</p>
            </div>
            <div>
              <label className="label-form">Rating: </label>
              <input
                type="number"
                name="rating"
                value={input.rating}
                onChange={handlerChange}
              />
              <p className="error-form">{error.rating && error.rating}</p>
            </div>
            <div className="container-genres">
              {allGenres.map((genre) => (
                <label key={genre.id} className="label-genre">
                  <input
                    type="checkbox"
                    name="genre"
                    id={genre.id}
                    key={genre.id}
                    value={genre.name}
                    onChange={handlerCheck}
                  />

                  {genre.name}
                  <p className="error-form">{error.genres && error.genres}</p>
                </label>
              ))}
            </div>

            {Object.keys(error).length === 0 ? (
              <button type="submit">Enviar</button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
