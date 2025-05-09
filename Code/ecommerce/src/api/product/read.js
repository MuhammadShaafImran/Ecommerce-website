import supabase from '../supabase';

/**
 * Get all products with basic information
 */
export const getAllProducts = async () => {
  const { data, error } = await supabase.from("products").select(`
        id, 
        name, 
        description, 
        price,
        categories (name, description),
        inventory (stock)
      `);

  if (error) throw error;

  return data;
};

/**
 * Get all reviews from the database
 */
export const getAllReviews = async () => {
  const { data, error } = await supabase.from("reviews").select(`
        id, 
        product_id, 
        user_id, 
        rating, 
        comment,
        created_at
      `);

  if (error) throw error;

  return data;
};

/**
 * Get a single product by ID with all related information
 */
export const getProductById = async (id) => {
  // Fetch the product basic info
  const { data: product, error: productError } = await supabase
    .from("products")
    .select(`
        id, 
        name, 
        description, 
        price,
        categories (name, description),
        inventory (stock)
      `)
    .eq("id", id)
    .single();

  if (productError) throw productError;
  
  // Fetch images for this product
  const { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select(`
        id, 
        product_id, 
        url, 
        alt_text
      `)
    .eq("product_id", id);
    
  if (imagesError) throw imagesError;
  
  // Add images to the product object
  return {
    ...product,
    images: images || []
  };
};

/**
 * Get reviews for a specific product with user information
 */
export const getUsersReviewsByProductId = async (productId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
        product_id, 
        user_id, 
        rating, 
        comment,
        created_at,
        users (username, email)
      `)
    .eq("product_id", productId);

  if (error) throw error;

  return data;
};

/**
 * Get all reviews with user information
 */
export const getUsersReviews = async () => {
  const { data, error } = await supabase
    .from("reviews") 
    .select(`
      *,
      users (username,addresses (city,state,country))
    `);

  if (error) throw error;

  return data;
};

/**
 * Get all categories
 */
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name, 
      description
    `);
    
  if (error) throw error;
  
  return data;
};

/**
 * Get all product images
 */
export const getAllImages = async () => {
  const { data, error } = await supabase.from("product_images").select(`
        id, 
        product_id, 
        url, 
        alt_text
      `);

  if (error) throw error;

  return data;
};

/**
 * Get products sorted by their average rating
 */
export const getProductsSortedByRating = async () => {
  const products = await getAllProducts();
  if (!products) throw new Error("No products found");

  const images = await getAllImages();
  const reviews = await getAllReviews();

  // Combine data and calculate ratings
  const enrichedProducts = products.map((product) => {
    const productImages = images.filter((img) => img.product_id === product.id);

    const productReviews = reviews.filter(
      (review) => review.product_id === product.id
    );

    const averageRating =
      productReviews.length > 0
        ? productReviews.reduce((acc, curr) => acc + curr.rating, 0) /
          productReviews.length
        : 0;

    return {
      ...product,
      images: productImages,
      rating: Number(averageRating.toFixed(1)),
    };
  });

  return enrichedProducts.sort((a, b) => b.rating - a.rating);
};

/**
 * Filter products by category
 */
export const getProductsByCategory = async (categoryName) => {
  const products = await getProductsSortedByRating();
  
  return products.filter(product => 
    product.categories && product.categories.name.toLowerCase() === categoryName.toLowerCase()
  );
};

/**
 * Search products by name or description
 */
export const searchProducts = async (query) => {
  const products = await getProductsSortedByRating();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get products sorted by price (low to high)
 */
export const getProductsSortedByPriceLowToHigh = async () => {
  const products = await getProductsSortedByRating();
  return [...products].sort((a, b) => a.price - b.price);
};

/**
 * Get products sorted by price (high to low)
 */
export const getProductsSortedByPriceHighToLow = async () => {
  const products = await getProductsSortedByRating();
  return [...products].sort((a, b) => b.price - a.price);
};

/**
 * Get the newest products (based on ID, assuming higher ID = newer)
 */
export const getNewestProducts = async (limit = 8) => {
  const products = await getProductsSortedByRating();
  return [...products].sort((a, b) => b.id - a.id).slice(0, limit);
};

// Get the specification of the product by ID

export const getProductSpecificationById = async (id) => {
  const { data, error } = await supabase
    .from("specifications")
    .select(` 
        product_id, 
        connectivity, 
        batterylife,
        compatibility,
        dimensions,
        weight
      `)
    .eq("product_id", id);

  if (error) throw error;

  return data;
}

/**
 * Get a complete product by ID with all related information
 * including images, specifications, reviews, and basic product details
 * 
 * @param {number|string} id - The product ID
 * @returns {Promise<Object>} Complete product data with all related information
 */
export const getCompleteProductById = async (id) => {
  try {
    // 1. Fetch basic product info with category and inventory
    const { data: product, error: productError } = await supabase
      .from("products")
      .select(`
        id, 
        name, 
        description, 
        price,
        created_at,
        categories (id, name, description),
        inventory (stock)
      `)
      .eq("id", id)
      .single();

    if (productError) throw productError;
    if (!product) throw new Error(`Product with ID ${id} not found`);
    
    // 2. Fetch product images
    const { data: images, error: imagesError } = await supabase
      .from("product_images")
      .select(`
        id, 
        url, 
        alt_text,
        created_at
      `)
      .eq("product_id", id);
      
    if (imagesError) throw imagesError;
    
    // 3. Fetch product specifications
    const { data: specifications, error: specificationsError } = await supabase
      .from("specifications")
      .select(`
        spec_id,
        connectivity, 
        batterylife,
        compatibility,
        dimensions,
        weight
      `)
      .eq("product_id", id);
      
    if (specificationsError) throw specificationsError;
    
    // 4. Fetch reviews with user information
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select(`
        id,
        rating, 
        comment,
        created_at,
        users (
          id,
          username,
          full_name
        )
      `)
      .eq("product_id", id);
      
    if (reviewsError) throw reviewsError;
    
    // 5. Calculate average rating
    const averageRating = reviews && reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
    
    // 6. Compile all data into a complete product object
    const completeProduct = {
      ...product,
      images: images || [],
      specifications: specifications && specifications.length > 0 ? specifications[0] : null,
      reviews: reviews || [],
      rating: {
        average: Number(averageRating.toFixed(1)),
        count: reviews?.length || 0,
        distribution: calculateRatingDistribution(reviews || [])
      }
    };
    
    return completeProduct;
    
  } catch (error) {
    console.error("Error fetching complete product data:", error);
    throw error;
  }
};

/**
 * Calculate the distribution of ratings (how many 5-star, 4-star, etc.)
 * 
 * @param {Array} reviews - Array of review objects
 * @returns {Object} Distribution of ratings
 */
const calculateRatingDistribution = (reviews) => {
  const distribution = {
    5: 0,
    4: 0,
    3: 0, 
    2: 0,
    1: 0
  };
  
  reviews.forEach(review => {
    const rating = review.rating;
    if (rating >= 1 && rating <= 5) {
      distribution[rating]++;
    }
  });
  
  return distribution;
};

/**
 * Get related products based on the same category
 * 
 * @param {number|string} productId - The current product ID
 * @param {number|string} categoryId - The category ID
 * @param {number} limit - Maximum number of related products to return
 * @returns {Promise<Array>} Related products
 */
export const getRelatedProducts = async (productId, categoryId, limit = 4) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id, 
        name, 
        description, 
        price,
        categories (id, name),
        inventory (stock),
        product_images (id, url, alt_text)
      `)
      .eq("category_id", categoryId)
      .neq("id", productId)
      .limit(limit);
      
    if (error) throw error;
    
    // Format the products to include the primary image and clean up the structure
    return data.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.categories,
      stock: product.inventory?.stock || 0,
      image: product.product_images && product.product_images.length > 0 
        ? product.product_images[0].url 
        : null
    }));
    
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }
};

export default getCompleteProductById;