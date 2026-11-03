import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

import MemoryGame from "./games/MemoryGame";
import SnakeGame from "./games/SnakeGame";
import TicTacToe from "./games/TicTacToe";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    

      <Route
  path="/games/memory"
  element={
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <MemoryGame />
    </div>
  }
/>

<Route
  path="/games/snake"
  element={
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <SnakeGame />
    </div>
  }
/>

<Route 
path="/games/tic-tac-toe"
element={
  <div className="min-h-screen bg-gray-950 text-white p-6">
    <TicTacToe />
  </div>
}

/>


    </Routes>
  );
}

export default App;