
import { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({
  X: 0,
  O: 0,
  draw: 0,
  });

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner(squares) {
    for (let [a, b, c] of winningCombinations) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);
  

function handleClick(index) {
  if (board[index] || winner || isDraw) return;

  const newBoard = [...board];
  const currentPlayer = isXNext ? "X" : "O";

  newBoard[index] = currentPlayer;

  const newWinner = calculateWinner(newBoard);
  const newDraw = !newWinner && newBoard.every(Boolean);

  if (newWinner) {
    setScores((previousScores) => ({
      ...previousScores,
      [newWinner]: previousScores[newWinner] + 1,
    }));
  } else if (newDraw) {
    setScores((previousScores) => ({
      ...previousScores,
      draw: previousScores.draw + 1,
    }));
  }

  setBoard(newBoard);
  setIsXNext(!isXNext);



    setBoard(newBoard);
    setIsXNext(!isXNext);

}
  

  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (

    <div className="flex flex-col items-center gap-6 mt-10">
      <h2 className="text-3xl font-bold">
        Tic-Tac-Toe
      </h2>

      <p className="text-xl text-purple-400">
        { winner
          ? `Winner: ${winner} 🎉`
          : isDraw
          ? "It's a draw!"
          : `Player ${isXNext ? "X" : "O"}'s turn`}
      </p>
      

      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
  <div className="bg-gray-800 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">Player X</p>
    <h3 className="text-3xl font-bold text-purple-400">
      {scores.X}
    </h3>
  </div>

  <div className="bg-gray-800 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">Draws</p>
    <h3 className="text-3xl font-bold">
      {scores.draw}
    </h3>
  </div>

  <div className="bg-gray-800 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">Player O</p>
    <h3 className="text-3xl font-bold text-sky-400">
      {scores.O}
    </h3>
  </div>
</div>

      <div className="grid grid-cols-3 gap-3">
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-gray-800 rounded-xl text-4xl font-bold hover:bg-gray-700 transition"
          >
            {square}
          </button>
        ))}
      </div>

     <div className="flex gap-3">
  <button
    onClick={restartGame}
    className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg transition"
  >
    Next Round
  </button>

  <button
    onClick={resetScores}
    className="bg-gray-700 hover:bg-gray-600 px-5 py-3 rounded-lg transition"
  >
    Reset Scores
  </button>
</div>
    </div>
  );
}
  function resetScores() {
  setScores({
    X: 0,
    O: 0,
    draw: 0,
  });

  restartGame();
}


export default TicTacToe;