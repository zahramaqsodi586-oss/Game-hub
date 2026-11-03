

import { Link } from "react-router-dom";

function GamePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <Link
        to="/"
        className="text-purple-400 hover:text-purple-300"
      >
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-center mt-10">
        Tic-Tac-Toe 🎮
      </h1>

      <p className="text-gray-400 text-center mt-4">
        Your game will appear here soon!
      </p>
    </div>
  );
}

export default GamePage;