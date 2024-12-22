import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types/product';

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        const searchProducts = async () => {
            if (!searchTerm) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/get-product');
                const data = await response.json();
                const filteredProducts = data.products.filter((product: Product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setResults(filteredProducts);
            } catch (error) {
                console.error('Error searching products:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(searchProducts, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleProductClick = (product: Product) => {
        navigate(`/product/${product._id}`);
        onClose();
        setSearchTerm('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
                >
                    <motion.div
                        ref={searchRef}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="bg-white w-full max-w-2xl rounded-lg shadow-xl mx-4"
                    >
                        <div className="p-4 border-b flex items-center gap-3">
                            <SearchIcon size={20} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 outline-none text-lg"
                                autoFocus
                            />
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto">
                            {loading ? (
                                <div className="p-4 text-center">
                                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="p-2">
                                    {results.map((product) => (
                                        <button
                                            key={product._id}
                                            onClick={() => handleProductClick(product)}
                                            className="w-full p-2 hover:bg-gray-50 rounded-lg flex items-center gap-4 text-left"
                                        >
                                            <img
                                                src={product.img}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/placeholder.svg';
                                                }}
                                            />
                                            <div>
                                                <h3 className="font-medium">{product.name}</h3>
                                                <p className="text-sm text-gray-500">{product.category}</p>
                                                <p className="text-primary font-medium">₹{product.price}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : searchTerm ? (
                                <div className="p-4 text-center text-gray-500">
                                    No products found
                                </div>
                            ) : null}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Search;