import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';

export interface ProductCardProps {
  id: string;
  name: string;
  price: string | number;
  imageUrl: string;
  category?: string;
  rating?: number;
  inStock?: number;
  sold?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  imageUrl, 
  category, 
  rating,
  inStock,
  sold 
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const formattedPrice = typeof price === 'string' ? price : price.toString();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    addToCart({ _id: id, name, price, img: imageUrl });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({ _id: id, name, price, img: imageUrl });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden group">
          <div className="relative aspect-[4/5]">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg?height=400&width=300';
              }}
            />
            <div className="absolute top-0 right-0 p-2 flex flex-col gap-2">
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full ${
                  isInWishlist(id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                } transition-colors duration-200 shadow-md`}
              >
                <Heart size={20} className={isInWishlist(id) ? 'fill-current' : ''} />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-primary hover:text-white transition-colors duration-200 shadow-md"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
            {inStock !== undefined && inStock < 10 && inStock > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                Only {inStock} left!
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="mb-2">
              {category && (
                <span className="text-xs text-primary uppercase tracking-wider">{category}</span>
              )}
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary truncate">
                {name}
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-primary">₹{formattedPrice}</span>
              </div>
              {rating !== undefined && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            {sold !== undefined && sold > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                {sold} sold
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;