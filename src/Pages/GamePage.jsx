import { Link } from "react-router-dom";
import TicTacToe from "../games/TicTacToe";

function GamePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <Link
        to="/"
        className="text-purple-400 hover:text-purple-300"
      >
        ← Back to Home
      </Link>

      <TicTacToe />
    </div>
  );
}

export default GamePage;