import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import AskNickname from "./components/AskNickname";
import MagicNumber from "./components/MagicNumber";
import Hello from "./components/Hello";

const io = socketIO("http://localhost:8080");

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState("");

  io.on("event::hello", () => {
    console.log("handshake");
  });

  io.on("event::gameStarted", () => {
    console.log("Game has started");
    setGameStarted(true);
  });

  io.on("event::gameFull", () => {
    console.log("The game is complet");
  });

  io.on("event::winnable", payload => {
    setGameOver(true);
  })

  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-head">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>PWA Games</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
            {!gameStarted ? <AskNickname io={io}/> : <MagicNumber io={io}/>
            }
          </header>
        </div>

      </div>
      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>Let's Rock!</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
