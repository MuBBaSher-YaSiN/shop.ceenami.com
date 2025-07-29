import { Link } from "react-router-dom";
import logo from "../../assets/golden-logo.webp";

export default function Footer() {
  const links = [
    {
      name: "Ceenami Haus",
      url: "https://ceenamihaus-ceenami-com.vercel.app/",
    },
    {
      name: "CleanNami",
      url: "https://cleannami-ceenami-com.vercel.app/",
      external: true,
    },
    { name: "Ceenami Music", url: "", external: true },
  ];

  return (
    <footer className="bg-black border-t border-[#d5b56e]/20 py-8 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Ceenami Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-[#d5b56e] font-semibold tracking-wide">
              Ceenami Shop
            </span>
          </div>

          {/* Main links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#d5b56e] transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.url}
                  className="text-white/80 hover:text-[#d5b56e] transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#d5b56e]/10 my-4"></div>

        {/* Legal and copyright */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Ceenami. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
