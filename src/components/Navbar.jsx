import { Gamepad2 } from "lucide-react";


function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 sticky top-0">
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
          <a
            href="#home"
            className="
    bg-gray-800
    text-white
    px-6 py-3
    rounded-lg
    border border-purple-500/40
    transition-all duration-300
    hover:bg-purple-600
    hover:shadow-lg
    hover:shadow-purple-500/40
    hover:-translate-y-1
  "
          >
            Home
          </a>

          <a
            href="#games"
            className="
    bg-gray-800
    text-white
    px-6 py-3
    rounded-lg
    border border-purple-500/40
    transition-all duration-300
    hover:bg-purple-600
    hover:shadow-lg
    hover:shadow-purple-500/40
    hover:-translate-y-1
  "
          >
            Games
          </a>

          <a
            href="#games"
            className="
    bg-gray-800
    text-white
    px-6 py-3
    rounded-lg
    border border-purple-500/40
    transition-all duration-300
    hover:bg-purple-600
    hover:shadow-lg
    hover:shadow-purple-500/40
    hover:-translate-y-1
  "
          >
            Play Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
