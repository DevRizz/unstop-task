import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

interface Product {
  _id: string;
  productId: string;
  name: string;
  price: string;
  img: string;
  category: string;
  inStockValue: number;
  soldStockValue: number;
  rating: number;
  visibility: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-product');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Mytalorzone By Sahiba</h1>
        <p className="text-lg text-gray-600">Discover our latest collection of trendy and traditional wear</p>
      </motion.div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products available at the moment.
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                id={product._id}
                name={product.name}
                price={product.price}
                imageUrl={product.img}
                category={product.category}
                rating={product.rating}
                inStock={product.inStockValue}
                sold={product.soldStockValue}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;