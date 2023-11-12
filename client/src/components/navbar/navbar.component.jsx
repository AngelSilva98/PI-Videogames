import "./navbar.style.css";

function Navbar({ handlerSubmits, handlerChanges }) {
  return (
    <div className="navbar-form">
      <form>
        <h1 className="titulo-search">Search your game</h1>
        <input
          type="text"
          onChange={handlerChanges}
          placeholder="search game"
          className="search-box"
        />
        <button onClick={handlerSubmits} className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default Navbar;
