import Cards from "../cards/cards.component";
import "./cardList.style.css";

function CardList({ allGames }) {
  const gameList = allGames;
  return (
    <div className="cardlist-container">
      {gameList?.map((game, index) => (
        <Cards key={index} game={game} />
      ))}
    </div>
  );
}

export default CardList;
