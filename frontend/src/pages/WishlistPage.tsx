import React from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <Heart size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-4">Start adding items you love to your wishlist</p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative aspect-square">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg?height=400&width=400';
                }}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleWishlist(item)}
                  className="p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors duration-200"
                >
                  <Heart size={20} className="fill-current" />
                </button>
                <button
                  onClick={() => addToCart(item)}
                  className="p-2 rounded-full bg-primary text-white shadow-md hover:bg-primary-dark transition-colors duration-200"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <Link to={`/product/${item._id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
                  {item.name}
                </h3>
                <p className="text-lg font-bold text-primary mt-2">₹{item.price}</p>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;