import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, SearchIcon, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Search from './Search';
import { useShop } from '../context/ShopContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Traditional', path: '/category/traditional' },
    { name: 'Western', path: '/category/western' },
    { name: 'Trendy', path: '/category/trendy' },
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        {/* Announcement Bar */}
        <div className="bg-primary/10 text-primary py-2 px-4 text-center text-sm">
          <p>Free Shipping on Orders Above ₹999 | Easy Returns</p>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            {/* Main Header Content */}
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link to="/" className="flex flex-col items-center group">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-bold tracking-wider"
                >
                  <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    MYTALORZONE
                  </span>
                </motion.h1>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm italic text-gray-500 font-serif"
                >
                  By Sahiba
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleCategoryClick(item.path)}
                    className={`relative group py-2 px-1 text-gray-700 hover:text-primary transition-colors duration-300
                      ${location.pathname === item.path ? 'text-primary' : ''}`}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </span>
                  </button>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:text-primary transition-colors duration-300"
                >
                  <SearchIcon size={20} />
                </button>
                <button 
                  onClick={() => navigate('/wishlist')}
                  className="hover:text-primary transition-colors duration-300"
                >
                  <Heart size={20} />
                </button>
                <Link to="/cart" className="relative group">
                  <ShoppingCart size={20} className="group-hover:text-primary transition-colors duration-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-300"
                >
                  <User size={20} />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t"
            >
              <div className="container mx-auto px-4 py-4 bg-white">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleCategoryClick(item.path)}
                      className={`text-lg text-left ${location.pathname === item.path ? 'text-primary' : 'text-gray-700'}`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <div className="pt-4 border-t space-y-4">
                    <button 
                      onClick={() => {
                        navigate('/cart');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <ShoppingCart size={20} />
                      <span>Cart ({cartCount})</span>
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <User size={20} />
                      <span>Profile</span>
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;