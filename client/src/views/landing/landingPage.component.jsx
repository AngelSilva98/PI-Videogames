import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.style.css";

export default function LandinPage() {
  return (
    <div className="landing-container">
      <h1 className="titulo-landing">Bienvenido! </h1>
      <h2 className="titulo-secundario-landing">Let's play 🎮 </h2>
      <Link to="/home">
        <button className="join-button">Ingresar</button>
      </Link>
    </div>
  );
}
