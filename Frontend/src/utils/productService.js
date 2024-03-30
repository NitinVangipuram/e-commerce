
const baseUrl = 'http://localhost:5000/api/products'; // Adjust this URL to your actual API endpoint

export const productService = {
  getProductById: async (productId) => {
    try {
      const response = await fetch(`${baseUrl}/${productId}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Failed to fetch product", error);
      return null;
    }
  },
};
