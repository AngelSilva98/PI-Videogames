import React from "react";
import "./paginado.style.css";

export default function Paginado({ gamesPerPage, allGames, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav-paginado">
      <ul className="paginado-list">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className="numeros-pag">
              <a onClick={() => paginado(number)} className="link-paginado">
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
