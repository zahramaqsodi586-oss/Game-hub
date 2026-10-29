import { Gamepad2 } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Gamepad2 className="text-purple-500" size={30} />
          <h1 className="text-2xl font-bold">
            Game<span className="text-purple-500">Hub</span>
          </h1>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <a href="#home" className="hover:text-purple-400 transition">
            Home
          </a>

          <a href="#games" className="hover:text-purple-400 transition">
            Games
          </a>

          <a
            href="#games"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
          >
            Play Now
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;