import supabase from '../supabase';

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

export const getProductById = async (id) => {
  const { data, error } = await supabase
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

  if (error) throw error;

  return data;
}

export const getUsersReviewsByProductId = async (productId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
        id, 
        product_id, 
        user_id, 
        rating, 
        comment,
        created_at,
        users (name, email)
      `)
    .eq("product_id", productId);

  if (error) throw error;

  return data;
}

export const getUsersReviews = async () => {
  const { data, error } = await supabase
    .from("reviews") 
    .select(`
      *,
      users (username,addresses (city,state,country))
    `);

  if (error) throw error;

  return data;
}


export const getAllCategories = async () => {};

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

export const getProductsSortedByRating = async () => {
  const products = await getAllProducts();
  if (!products) throw new Error("No products found");

  const images = await getAllImages();
  const reviews = await getAllReviews();

  //Combine data and calculate ratings
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
