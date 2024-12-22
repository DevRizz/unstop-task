const API_BASE_URL = 'http://localhost:5000';

// Helper function to ensure image URLs are properly formatted
export const getImageUrl = (imageUrl: string) => {
  if (!imageUrl) return '/placeholder.svg';
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('uploads/')) return `${API_BASE_URL}/${imageUrl}`;
  if (imageUrl.startsWith('/uploads/')) return `${API_BASE_URL}${imageUrl}`;
  return `${API_BASE_URL}/uploads/${imageUrl}`;
};

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/get-product`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  // Transform the image URLs in the response
  return data.products.map((product: any) => ({
    ...product,
    imageUrl: getImageUrl(product.imageUrl)
  }));
};

export const getProductsByCategory = async (category: string) => {
  const response = await fetch(`${API_BASE_URL}/product/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  const data = await response.json();
  // Transform the image URLs in the response
  return data.products.map((product: any) => ({
    ...product,
    imageUrl: getImageUrl(product.imageUrl)
  }));
};

export const getProductById = async (productId: string) => {
  const response = await fetch(`${API_BASE_URL}/product/${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  const data = await response.json();
  // Transform the image URL in the response
  return {
    ...data.product,
    imageUrl: getImageUrl(data.product.imageUrl)
  };
};