import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-xl font-bold text-gray-900"
        >
          <img src="/1fi.svg" alt="1Fi" className="h-8 w-auto" />

          <span className="font-normal text-[#001A3F] ml-2">| SmartPay</span>
        </Link>

        {/* Tagline */}
        <div className="text-md font-bold whitespace-nowrap">
          <span className="text-[#001A3F]">Upgrade today.</span>{" "}
          <span className="text-[#0057B8]">Pay monthly.</span>{" "}
          <span className="text-[#7C3AED]">Stay flexible.</span>
        </div>
      </div>
    </header>
  );
}
