import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";

const GRID_SIZE = 15;
const GAME_SPEED = 200;

const initialSnake = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
];

function getNextHead(head, direction) {
  switch (direction) {
    case "UP":
      return { x: head.x, y: head.y - 1 };
    case "DOWN":
      return { x: head.x, y: head.y + 1 };
    case "LEFT":
      return { x: head.x - 1, y: head.y };
    case "RIGHT":
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
}

function generateFood(snake) {
  const emptyCells = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const occupied = snake.some((part) => part.x === x && part.y === y);

      if (!occupied) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function createGame() {
  return {
    snake: initialSnake.map((part) => ({ ...part })),
    food: { x: 10, y: 10 },
    direction: "RIGHT",
    nextDirection: "RIGHT",
    score: 0,
    gameOver: false,
    isPaused: false,
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case "DIRECTION": {
      if (state.gameOver || state.isPaused) {
        return state;
      }

      const opposites = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (action.direction === opposites[state.direction]) {
        return state;
      }

      return {
        ...state,
        nextDirection: action.direction,
      };
    }

    case "TICK": {
      if (state.gameOver || state.isPaused) {
        return state;
      }

      const newHead = getNextHead(state.snake[0], state.nextDirection);

      const eating =
        state.food !== null &&
        newHead.x === state.food.x &&
        newHead.y === state.food.y;

      const hitWall =
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE;

      const bodyToCheck = eating ? state.snake : state.snake.slice(0, -1);

      const hitSelf = bodyToCheck.some(
        (part) => part.x === newHead.x && part.y === newHead.y,
      );

      if (hitWall || hitSelf) {
        return {
          ...state,
          gameOver: true,
        };
      }

      const newSnake = eating
        ? [newHead, ...state.snake]
        : [newHead, ...state.snake.slice(0, -1)];

      const newFood = eating ? action.food : state.food;

      return {
        ...state,
        snake: newSnake,
        food: newFood,
        direction: state.nextDirection,
        score: state.score + (eating ? 10 : 0),
        gameOver: eating && newFood === null,
      };
    }

    case "PAUSE":
      if (state.gameOver) return state;

      return {
        ...state,
        isPaused: !state.isPaused,
      };

    case "RESTART":
      return createGame();

    default:
      return state;
  }
}

function SnakeGame() {
  const [game, dispatch] = useReducer(gameReducer, undefined, createGame);

  const { snake, food, score, gameOver, isPaused } = game;

  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("snakeHighScore")) || 0;
    } catch {
      return 0;
    }
  });

  // Keep the latest game available to the timer.
  const gameRef = useRef(game);
  gameRef.current = game;

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);

      try {
        localStorage.setItem("snakeHighScore", String(score));
      } catch {
        // Storage may be unavailable.
      }
    }
  }, [score, highScore]);

  // Automatic movement
  useEffect(() => {
    if (gameOver || isPaused) return;

    const timer = setInterval(() => {
      const current = gameRef.current;

      if (current.gameOver || current.isPaused) {
        return;
      }

      const nextHead = getNextHead(current.snake[0], current.nextDirection);

      const eating =
        current.food !== null &&
        nextHead.x === current.food.x &&
        nextHead.y === current.food.y;

      const nextSnake = eating
        ? [nextHead, ...current.snake]
        : [nextHead, ...current.snake.slice(0, -1)];

      dispatch({
        type: "TICK",
        food: eating ? generateFood(nextSnake) : null,
      });
    }, GAME_SPEED);

    return () => clearInterval(timer);
  }, [gameOver, isPaused]);

  // Keyboard controls
  useEffect(() => {
    function handleKeyDown(event) {
      const directions = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };

      const newDirection = directions[event.key];

      if (!newDirection) return;

      event.preventDefault();

      dispatch({
        type: "DIRECTION",
        direction: newDirection,
      });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function changeDirection(newDirection) {
    dispatch({
      type: "DIRECTION",
      direction: newDirection,
    });
  }

  function restartGame() {
    dispatch({ type: "RESTART" });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center gap-6 px-4 py-8">
      {/* Back to Home */}
      <Link
        to="/"
        className="self-start bg-gray-800 hover:bg-purple-600 px-5 py-3 rounded-lg transition"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold">Snake Game 🐍</h1>

      {/* Scoreboard */}
      <div className="flex gap-4">
        <div className="bg-gray-800 px-6 py-4 rounded-xl text-center">
          <p className="text-gray-400 text-sm">SCORE</p>
          <h2 className="text-3xl font-bold text-green-400">{score}</h2>
        </div>

        <div className="bg-gray-800 px-6 py-4 rounded-xl text-center">
          <p className="text-gray-400 text-sm">HIGH SCORE</p>
          <h2 className="text-3xl font-bold text-yellow-400">{highScore}</h2>
        </div>
      </div>

      {/* Game Board */}
      <div
        className="grid gap-0.5 bg-gray-900 p-2 rounded-xl w-full max-w-[450px]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({
          length: GRID_SIZE * GRID_SIZE,
        }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);

          const isSnake = snake.some((part) => part.x === x && part.y === y);

          const isFood = food !== null && food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={`aspect-square rounded-sm ${
                isSnake ? "bg-green-500" : isFood ? "bg-red-500" : "bg-gray-800"
              }`}
            />
          );
        })}
      </div>

      {/* Game Status */}
      {gameOver && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400">Game Over!</h2>
          <p className="text-gray-400 mt-2">Your score: {score}</p>
        </div>
      )}

      {isPaused && !gameOver && (
        <p className="text-yellow-400 text-xl font-bold">Game Paused ⏸</p>
      )}

      {/* Pause and Restart */}
      <div className="flex gap-4">
        <button
          onClick={() => dispatch({ type: "PAUSE" })}
          disabled={gameOver}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg transition"
        >
          {isPaused ? "▶️ Resume" : "⏸ Pause"}
        </button>

        <button
          onClick={restartGame}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
        >
          ↻ Restart Game
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <button
          onClick={() => changeDirection("UP")}
          disabled={gameOver || isPaused}
          className="bg-gray-700 hover:bg-purple-600 disabled:opacity-40 w-16 h-14 rounded-xl text-2xl"
        >
          ↑
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => changeDirection("LEFT")}
            disabled={gameOver || isPaused}
            className="bg-gray-700 hover:bg-purple-600 disabled:opacity-40 w-16 h-14 rounded-xl text-2xl"
          >
            ←
          </button>

          <button
            onClick={() => changeDirection("DOWN")}
            disabled={gameOver || isPaused}
            className="bg-gray-700 hover:bg-purple-600 disabled:opacity-40 w-16 h-14 rounded-xl text-2xl"
          >
            ↓
          </button>

          <button
            onClick={() => changeDirection("RIGHT")}
            disabled={gameOver || isPaused}
            className="bg-gray-700 hover:bg-purple-600 disabled:opacity-40 w-16 h-14 rounded-xl text-2xl"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;
