import React, { useState, useEffect } from "react";
import "./App.css";
// import axios from "axios";

function App() {
  const [player1Choice, setPlayer1Choice] = useState("stone");
  const [player2Choice, setPlayer2Choice] = useState("stone");
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);

  const choices = ["stone", "paper", "scissors"];

  const handleClick = (value) => {
    setPlayer1Choice(value);
    generatePlayer2Choice();
  };

  const generatePlayer2Choice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayer2Choice(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const comboMoves = player1Choice + player2Choice;
    if (player1Points <= 6 && player2Points <= 6) {
      if (
        comboMoves === "stonescissors" ||
        comboMoves === "scissorspaper" ||
        comboMoves === "paperstone"
      ) {
        const updatedPlayer1Points = player1Points + 1;
        setPlayer1Points(updatedPlayer1Points);
        setTurnResult("Player gets the point!");
        if (updatedPlayer1Points === 7) {
          setResult("Player 1 Wins");
          setGameOver(true);
          // saveGameResult("Player 1 Wins"); // Call function to save game result
        }
      }

      if (
        comboMoves === "scissorsstone" ||
        comboMoves === "paperscissors" ||
        comboMoves === "stonepaper"
      ) {
        const updatedPlayer2Points = player2Points + 1;
        setPlayer2Points(updatedPlayer2Points);
        setTurnResult("Player2 gets the point!");
        if (updatedPlayer2Points === 7) {
          setResult("Player2 Wins");
          setGameOver(true);
          // saveGameResult("Player2 Wins"); // Call function to save game result
        }
      }

      if (
        comboMoves === "paperpaper" ||
        comboMoves === "stonestone" ||
        comboMoves === "scissorsscissors"
      ) {
        setTurnResult("It is a Tie!");
      }
    }
  }, [player2Choice, player1Choice]);

  // const saveGameResult = async (result) => {
  //   try {
  //     const response = await axios.post("/api/game", {
  //       player1Choice,
  //       player2Choice,
  //       result,
  //     });
  //     console.log("Game result saved:", response.data);
  //   } catch (error) {
  //     console.error("Error saving game result:", error.message);
  //   }
  // };

  return (
    <div className="App">
      <h1 className="heading">Stone-Paper-Scissors</h1>
      {/* Score */}
      <div className="score">
        <div className="player-1">
          <h2>Player-1 Points:</h2>
          <p>{player1Points}</p>
        </div>
        <div className="player-2">
          <h2>Player-2 Points:</h2>
          <p>{player2Points}</p>
        </div>
      </div>
      {/* Hand Image */}
      <div className="choice">
        <div className="choice-player1">
          <img
            className="player1-hand"
            src={`../images/${player1Choice}.png`}
            alt=""
          ></img>
        </div>
        <div className="choice-player2">
          <img
            className="player2-hand"
            src={`../images/${player2Choice}.png`}
            alt=""
          ></img>
        </div>
      </div>
      {/* Buttons */}
      <div className="button-div">
        {choices.map((choice, index) => (
          <button
            className="button"
            key={index}
            onClick={() => handleClick(choice)}
            disabled={gameOver}
          >
            {choice}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="result">
        <h2 className="game">Game Over!</h2>
        <h4 className="game">
          Turn Result: <span>{turnResult}</span>
        </h4>
        <h4 className="game">
          Final Result: <span>{result}</span>
        </h4>
      </div>

      {/* Button Restart */}
      <div className="button-restart">
        {gameOver && (
          <button className="button" onClick={() => reset()}>
            Restart Game?
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
