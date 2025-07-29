import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/golden-logo.webp';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Ceenami Haus', url: '/' },
    { name: 'CleanNami', url: 'https://cleannami-ceenami-com.vercel.app/', external: true },
    { name: 'Ceenami Music', url: 'https://ceenami.com', external: true }
  ];

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 ${scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-[#d5b56e]/20' : 'bg-black'}`}>
      {/* Gold top accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#d5b56e] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Ceenami Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-[#d5b56e] font-bold text-lg hidden sm:inline">Ceenami Haus</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center text-white space-x-8">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#f0e0b0] transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.url}
                  className="text-white hover:text-[#f0e0b0] transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#d5b56e] focus:outline-none"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-[#d5b56e]/20">
          <div className="px-2 pt-2 text-white pb-3 space-y-1">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-[#d5b56e] hover:text-[#f0e0b0] hover:bg-[#d5b56e]/10 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.url}
                  className="block px-3 py-2 text-[#d5b56e] hover:text-[#f0e0b0] hover:bg-[#d5b56e]/10 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
      
      {/* Gold bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#d5b56e]/50 to-transparent"></div>
    </nav>
  );
}