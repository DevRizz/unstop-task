import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { categoryProducts } from '../services/categoryProducts';

interface Product {
  _id: string;
  name: string;
  price: string;
  img: string;
  category: string;
  rating: number;
  inStockValue: number;
  soldStockValue: number;
  description: string;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (category) {
        const categoryKey = category.toLowerCase() as keyof typeof categoryProducts;
        setProducts(categoryProducts[categoryKey] || []);
      }
      setLoading(false);
    }, 500);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 capitalize">{category} Collection</h1>
        <p className="text-gray-600">
          Discover our exclusive {category?.toLowerCase()} wear collection
        </p>
      </motion.div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found in this category.
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

export default CategoryPage;