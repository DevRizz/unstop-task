import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  name: string;
  price: string;
  img: string;
  category?: string;
  rating?: number;
  inStockValue?: number;
  soldStockValue?: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

export default ProductList;