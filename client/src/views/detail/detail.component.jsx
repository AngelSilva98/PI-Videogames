import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/actions";
import { useEffect } from "react";
import Header from "../../components/header/header.component";
import "./detail.style.css";

function Detail(props) {
  console.log("Estas son las props", props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myGame = useSelector((state) => state.detail);
  console.log("este es myGame", myGame);

  return (
    <div className="detail-container">
      <Header />
      {myGame ? (
        <div>
          <h1 className="detail-name">{myGame.name}</h1>
          <img
            src={
              myGame.background_image ? myGame.background_image : myGame.image
            }
            className="detail-image"
          />
          <p className="detail-genres">
            Generos:{" "}
            {myGame.genres
              ? myGame.genres &&
                myGame.genres.map((genre) => genre.name).join(", ")
              : myGame.genress &&
                myGame.genress.map((genre) => genre).join(", ")}
          </p>
          <h3 className="detail-platforms">
            Plataformas:{" "}
            {Array.isArray(myGame.platforms)
              ? myGame.platforms &&
                myGame.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")
              : myGame.platforms}
          </h3>
          <p className="detail-rating">rating: {myGame.rating}⭐</p>
          <p className="detail-released">
            Fecha de lanzamiento: {myGame.released}
          </p>
          <p className="detail-description">
            Descripción:{" "}
            {myGame.description_raw
              ? myGame.description_raw
              : myGame.description}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        {" "}
        <button className="join-button">Home</button>
      </Link>
    </div>
  );
}

export default Detail;
