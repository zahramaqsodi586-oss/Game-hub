
import GameCard from "../Components/GameCard.jsx";
import { useState } from "react";
import Navbar from '../components/Navbar.jsx'


function Home() {
  const [search, setSearch] = useState("");
  const games = [
    {
      id: 1,
      title: "Tic Tac Toe",
      description: "Challenge a friend in this classic game.",
      image: "/images/memory.jpeg",
      link: "/games/tic-tac-toe",
    },
    {
      id: 2,
      title: "Memory Game",
      description: "Match the cards and test your memory.",
      image: "/images/tic-tac-teo.jpeg",
      link: "/games/memory",
    },
    {
      id: 3,
      title: "Snake Game",
      description: "Collect food and beat your high score.",
      image: "/images/snake.jpeg",
      link: "/games/snake",
    },
  ];

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div id="home" className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Play. Compete. <span className="text-purple-500">Have Fun.</span>
        </h1>

        <p className="text-gray-400 mb-8">
          Discover amazing mini games, all in one place.
        </p>

        <a
          href="#games"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
        >
          Explore Games
        </a>
      </section>

      {/* Games Section */}
      <section id="games" className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold mb-8"> Popular Games </h2>

        <div className="w-full max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="🔍 Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-whit  border border-gray-700
      rounded-xl
      px-5 py-3
      outline-none
      focus:border-purple-500
      focus:ring-2
      focus:ring-purple-500/30
      transition-all
      duration-300
    "
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              link={game.link}
            />
          ))}

          {filteredGames.length === 0 && (
            <p className="text-center text-gray-400 mt-8">
              No games found. Try another name!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
