
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const emojis = ["🎮", "🚀", "🎯", "👑", "💎", "🔥"];

function createCards() {
  const pairs = [...emojis, ...emojis];

  return pairs
    .map((emoji, index) => ({
      id: index,
      emoji: emoji,
    }))
    .sort(() => Math.random() - 0.5);
}

function MemoryGame() {
  const [cards, setCards] = useState(createCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);


function handleCardClick(id) {
  if (
    flippedCards.length === 2 ||
    flippedCards.includes(id) ||
    matchedCards.includes(id)
  ) {
    return;
  }

  setFlippedCards((previous) => [...previous, id]);
}


useEffect(() => {
  if (flippedCards.length !== 2) return;

  const [firstId, secondId] = flippedCards;

  const firstCard = cards.find((card) => card.id === firstId);
  const secondCard = cards.find((card) => card.id === secondId);

  setMoves((previous) => previous + 1);

  if (firstCard.emoji === secondCard.emoji) {
    setMatchedCards((previous) => [
      ...previous,
      firstId,
      secondId,
    ]);

    setFlippedCards([]);
  } else {
    const timer = setTimeout(() => {
      setFlippedCards([]);
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [flippedCards, cards]);



return (

  
  <div className="flex flex-col items-center gap-6 mt-10 px-4">

    
  <div className="flex flex-col items-center gap-6 mt-10 px-4">

    {/* Back to Home */}
    <Link
      to="/"
      className="self-start bg-gray-800 hover:bg-purple-600 text-white px-5 py-3 rounded-lg transition duration-300"
    >
      ← Back to Home
    </Link>
  </div>



    <h1 className="text-3xl font-bold">
      Memory Game 🧠
    </h1>

    <div className="flex gap-8 text-lg">
      <p>Moves: {moves}</p>
      <p>Matches: {matchedCards.length / 2} / 6</p>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {cards.map((card) => {
        const isFlipped =
          flippedCards.includes(card.id) ||
          matchedCards.includes(card.id);

        return (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl text-3xl font-bold transition-all duration-300 ${
              isFlipped
                ? "bg-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {isFlipped ? card.emoji : "?"}
          </button>
        );
      })}
    </div>

    {matchedCards.length === cards.length && (
      <p className="text-green-400 text-xl font-bold">
        Congratulations! You won! 🎉
      </p>
    )}

    <button
      onClick={() => {
        setCards(createCards());
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
      }}
      className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
    >
      Restart Game
    </button>
  </div>
);
}




export default MemoryGame;