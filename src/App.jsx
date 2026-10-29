import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import MemoryGame from "./games/MemoryGame";
import SnakeGame from "./games/SnakeGame";



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


    </Routes>
  );
}

export default App;