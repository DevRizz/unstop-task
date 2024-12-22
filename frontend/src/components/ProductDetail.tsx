import React from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-md" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-primary font-semibold mb-4">₹{product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

