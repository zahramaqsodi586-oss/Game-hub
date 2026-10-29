import Navbar from "../Components/Navbar";
import GameCard from "../Components/GameCard";

function Home(){
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


  return (
    <div
      id="home"
      className="min-h-screen bg-gray-950 text-white"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Play. Compete.{" "}
          <span className="text-purple-500">
            Have Fun.
          </span>
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
      <section
        id="games"
        className="max-w-6xl mx-auto px-6 pb-20"
      >
        <h2 className="text-3xl font-bold mb-8">
          Popular Games
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              link={game.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
}



export default Home;