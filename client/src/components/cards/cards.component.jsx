import "./cards.style.css";
import { Link } from "react-router-dom";

function Cards({ game }) {
  console.log(game);
  const { name, genres, image, id, rating, genress } = game;
  return (
    <div className="card-container">
      <Link to={`/home/${id}`} className="link-detail">
        <img src={image} alt="image not found" className="card-image" />
        <h2 className="card-name">Nombre: {name} </h2>
        <p className="card-genero">
          Géneros: {genres ? genres + " " : genress + " "}
        </p>
        <p>rating: {rating}⭐</p>
      </Link>
    </div>
  );
}

export default Cards;
