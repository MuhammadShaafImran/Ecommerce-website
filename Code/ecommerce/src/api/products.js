// data/products.js
import supabase from './supabase';

/**
 * Get all products with their images and category
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of products to fetch (default: 12)
 * @param {number} options.page - Page number for pagination (default: 1)
 * @param {number} options.categoryId - Filter by category ID (optional)
 * @param {string} options.sortBy - Sort field (default: 'created_at')
 * @param {string} options.sortOrder - Sort order: 'asc' or 'desc' (default: 'desc')
 * @returns {Promise<{data: Array, error: Object, count: number}>}
 */
export const getProducts = async ({
  limit = 12,
  page = 1,
  categoryId = null,
  sortBy = 'created_at',
  sortOrder = 'desc'
} = {}) => {
  // Calculate offset for pagination
  const offset = (page - 1) * limit;
  
  // Start building the query
  let query = supabase
    .from('products')
    .select(`
      *,
      product_images (*),
      categories:category_id (*),
      inventory (stock)
    `, { count: 'exact' });
  
  // Add category filter if provided
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  // Add sorting and pagination
  query = query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, offset + limit - 1);
  
  // Execute the query
  const { data, error, count } = await query;
  
  // Format the data
  const formattedData = data?.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    categoryId: product.category_id,
    category: product.categories,
    stock: product.inventory?.[0]?.stock || 0,
    images: product.product_images?.map(img => ({
      id: img.id,
      url: img.url,
      altText: img.alt_text
    })) || [],
    createdAt: product.created_at
  }));
  
  return { data: formattedData, error, count };
};

/**
 * Get a single product by ID with all related details
 * @param {number} id - Product ID
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*),
      categories:category_id (*),
      inventory (stock),
      reviews (
        *,
        users (username, full_name)
      )
    `)
    .eq('id', id)
    .single();
  
  if (error || !data) {
    return { data: null, error };
  }
  
  // Calculate average rating
  const reviews = data.reviews || [];
  const avgRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Format the data
  const formattedData = {
    id: data.id,
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    categoryId: data.category_id,
    category: data.categories,
    stock: data.inventory?.[0]?.stock || 0,
    images: data.product_images?.map(img => ({
      id: img.id,
      url: img.url,
      altText: img.alt_text
    })) || [],
    reviews: data.reviews?.map(review => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.created_at,
      user: {
        username: review.users.username,
        fullName: review.users.full_name
      }
    })) || [],
    avgRating,
    reviewCount: reviews.length,
    createdAt: data.created_at
  };
  
  return { data: formattedData, error: null };
};

/**
 * Get featured products (products with highest ratings or manually featured)
 * @param {number} limit - Number of products to fetch (default: 3)
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getFeaturedProducts = async (limit = 3) => {
  // For this example, we'll get products with highest average rating
  // You could add a 'featured' boolean field to the products table instead
  
  // First get all products with their reviews
  const { data: productsWithReviews, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (id, url, alt_text),
      reviews (rating)
    `)
    .order('created_at', { ascending: false })
    .limit(20); // Get a larger pool to filter from
  
  if (error || !productsWithReviews) {
    return { data: [], error };
  }
  
  // Calculate average rating for each product
  const productsWithAvgRating = productsWithReviews.map(product => {
    const reviews = product.reviews || [];
    const avgRating = reviews.length 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      images: product.product_images?.map(img => ({
        id: img.id,
        url: img.url,
        altText: img.alt_text
      })) || [],
      avgRating,
      reviewCount: reviews.length
    };
  });
  
  // Sort by average rating and take the top 'limit' products
  const featuredProducts = productsWithAvgRating
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, limit);
  
  return { data: featuredProducts, error: null };
};

/**
 * Get latest products
 * @param {number} limit - Number of products to fetch (default: 6)
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getLatestProducts = async (limit = 6) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (id, url, alt_text)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error || !data) {
    return { data: [], error };
  }
  
  const formattedData = data.map(product => ({
    id: product.id,
    name: product.name,
    price: parseFloat(product.price),
    images: product.product_images?.map(img => ({
      id: img.id,
      url: img.url,
      altText: img.alt_text
    })) || []
  }));
  
  return { data: formattedData, error: null };
};

/**
 * Get weekly deals (sample implementation)
 * This could be implemented with a separate deals table in a real application
 * @param {number} limit - Number of deals to fetch (default: 4)
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getWeeklyDeals = async (limit = 4) => {
  // In a real app, you could have a separate deals table or a 'discount' field
  // For this example, we'll just get some random products and simulate discounts
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (id, url, alt_text)
    `)
    .limit(limit);
  
  if (error || !data) {
    return { data: [], error };
  }
  
  // Simulate discounts (in a real app, this would come from the database)
  const discountPercentages = [10, 15, 20, 25, 30];
  
  const formattedDeals = data.map(product => {
    // Generate a random discount for this demo
    const discountPercent = discountPercentages[Math.floor(Math.random() * discountPercentages.length)];
    const originalPrice = parseFloat(product.price);
    const discountedPrice = originalPrice * (1 - discountPercent / 100);
    
    return {
      id: product.id,
      name: product.name,
      originalPrice: originalPrice,
      discountedPrice: parseFloat(discountedPrice.toFixed(2)),
      discountPercent,
      images: product.product_images?.map(img => ({
        id: img.id,
        url: img.url,
        altText: img.alt_text
      })) || []
    };
  });
  
  return { data: formattedDeals, error: null };
};

/**
 * Search products by name or description
 * @param {string} query - Search query
 * @param {number} limit - Number of results to return (default: 10)
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const searchProducts = async (query, limit = 10) => {
  if (!query || query.trim() === '') {
    return { data: [], error: null };
  }
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (id, url, alt_text)
    `)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(limit);
  
  if (error || !data) {
    return { data: [], error };
  }
  
  const formattedData = data.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    images: product.product_images?.map(img => ({
      id: img.id,
      url: img.url,
      altText: img.alt_text
    })) || []
  }));
  
  return { data: formattedData, error: null };
};

/**
 * Add or update a product review
 * @param {Object} reviewData - Review data
 * @param {number} reviewData.productId - Product ID
 * @param {number} reviewData.userId - User ID
 * @param {number} reviewData.rating - Rating (1-5)
 * @param {string} reviewData.comment - Review comment
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const addProductReview = async ({ productId, userId, rating, comment }) => {
  // Check if user has already reviewed this product
  const { data: existingReview, error: checkError } = await supabase
    .from('reviews')
    .select('id')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .maybeSingle();
  
  if (checkError) {
    return { data: null, error: checkError };
  }
  
  // If review exists, update it, otherwise create new one
  if (existingReview) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ rating, comment })
      .eq('id', existingReview.id)
      .select()
      .single();
    
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('reviews')
      .insert({ product_id: productId, user_id: userId, rating, comment })
      .select()
      .single();
    
    return { data, error };
  }
};