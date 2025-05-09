import supabase from '../supabase';

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
  const offset = (page - 1) * limit;
  
  let query = supabase
    .from('products')
    .select(`
      *,
      product_images (*),
      categories:category_id (*),
      inventory (stock)
    `, { count: 'exact' });
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  query = query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, offset + limit - 1);
  
  const { data, error, count } = await query;
  
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
    })) || []
  })) || [];
  
  return {
    data: formattedData,
    error,
    count
  };
};

export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category_id: productData.categoryId
    })
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create product');
  }

  return data;
};

export const updateProduct = async (productId, productData) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category_id: productData.categoryId
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    throw new Error('Failed to update product');
  }

  return data;
};

export const deleteProduct = async (productId) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    throw new Error('Failed to delete product');
  }
};
