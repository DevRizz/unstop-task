import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <ShoppingCart size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Start adding some items to your cart!</p>
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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <motion.div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg?height=200&width=200';
                  }}
                />
                <div className="flex-grow">
                  <Link to={`/product/${item._id}`} className="hover:text-primary">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                  </Link>
                  <p className="text-primary font-medium">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 sticky top-24"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{cartTotal > 999 ? 'Free' : '₹99.00'}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{(cartTotal + (cartTotal > 999 ? 0 : 99)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center">
              Proceed to Checkout
              <ArrowRight size={16} className="ml-2" />
            </button>
            {cartTotal < 999 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Add ₹{(999 - cartTotal).toFixed(2)} more for free shipping
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;