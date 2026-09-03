import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          1Fi <span className="font-normal text-gray-500">| EMI Store</span>
        </Link>
      </div>
    </header>
  );
}
