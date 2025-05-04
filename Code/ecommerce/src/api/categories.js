import supabase from "./supabase";

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true });
  
  return { data, error };
};

/**
 * Get categories with product counts
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getCategoriesWithCounts = async () => {
  // First get all categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (categoriesError || !categories) {
    return { data: [], error: categoriesError };
  }
  
  // Then count products in each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id);
      
      return {
        id: category.id,
        name: category.name,
        description: category.description,
        productCount: count || 0,
        createdAt: category.created_at
      };
    })
  );
  
  return { data: categoriesWithCount, error: null };
};

/**
 * Get a single category by ID with its products
 * @param {number} id - Category ID
 * @param {Object} options - Query options
 * @param {number} options.productLimit - Number of products to fetch (default: 12)
 * @param {number} options.productPage - Page number for pagination (default: 1)
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const getCategoryById = async (id, { productLimit = 12, productPage = 1 } = {}) => {
  // Calculate offset for pagination
  const offset = (productPage - 1) * productLimit;
  
  // Get the category
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (categoryError || !category) {
    return { data: null, error: categoryError };
  }
  
  // Get products in this category with pagination
  const { data: products, error: productsError, count: productCount } = await supabase
    .from('products')
    .select(`
      *,
      product_images (id, url, alt_text)
    `, { count: 'exact' })
    .eq('category_id', id)
    .order('created_at', { ascending: false })
    .range(offset, offset + productLimit - 1);
  
  if (productsError) {
    return { data: { ...category, products: [] }, error: productsError };
  }
  
  // Format products
  const formattedProducts = products.map(product => ({
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
  
  // Calculate total pages
  const totalPages = Math.ceil(productCount / productLimit);
  
  return {
    data: {
      id: category.id,
      name: category.name,
      description: category.description,
      products: formattedProducts,
      pagination: {
        currentPage: productPage,
        totalPages,
        totalProducts: productCount
      },
      createdAt: category.created_at
    },
    error: null
  };
};

/**
 * Get featured categories (for homepage display)
 * @param {number} limit - Number of categories to fetch (default: 4)
 * @returns {Promise<{data: Array, error: Object}>}
 */

export const getFeaturedCategories = async (limit = 4) => {
  // In a real application, you could have a 'featured' boolean field
  // For this example, we'll just get categories with most products
  
  // Get categories with product counts
  const { data: categoriesWithCount, error } = await getCategoriesWithCounts();
  
  if (error || !categoriesWithCount) {
    return { data: [], error };
  }
  
  // Sort by product count (descending) and take the top 'limit'
  const featuredCategories = categoriesWithCount
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit);
  
  // Add a sample image for each category (in a real app, you'd have category images)
  // For demo purposes, we'll get first product image from each category
  const categoriesWithImages = await Promise.all(
    featuredCategories.map(async (category) => {
      const { data: products } = await supabase
        .from('products')
        .select('product_images (url)')
        .eq('category_id', category.id)
        .limit(1);
      
      const imageUrl = products?.[0]?.product_images?.[0]?.url || '/api/placeholder/400/300';
      
      return {
        ...category,
        imageUrl
      };
    })
  );
  
  return { data: categoriesWithImages, error: null };
};