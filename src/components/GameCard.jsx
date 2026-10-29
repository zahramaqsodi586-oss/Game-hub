import { Link } from "react-router-dom";

function GameCard({ title, description, image, link }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>

        <p className="text-gray-400 mb-4">
          {description}
        </p>

       <Link
  to={link}
  className="inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
>
  Play Game →
</Link>
      </div>
    </div>
  );
}

export default GameCard;