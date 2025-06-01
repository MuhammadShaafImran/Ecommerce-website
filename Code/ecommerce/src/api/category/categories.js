import supabase from '../supabase';

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true });
  
  return { data, error };
};

export const getCategoriesWithCounts = async () => {
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (categoriesError || !categories) {
    return { data: [], error: categoriesError };
  }
  
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id);
      
      if (countError) {
        console.error(`Error getting count for category ${category.id}:`, countError);
        return { ...category, productCount: 0 };
      }
      
      return { ...category, productCount: count || 0 };
    })
  );
  
  return { data: categoriesWithCount, error: null };
};

export const createCategory = async (categoryData) => {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: categoryData.name,
      description: categoryData.description
    })
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create category');
  }

  return data;
};

export const updateCategory = async (categoryId, categoryData) => {
  const { data, error } = await supabase
    .from('categories')
    .update({
      name: categoryData.name,
      description: categoryData.description
    })
    .eq('id', categoryId)
    .select()
    .single();

  if (error) {
    throw new Error('Failed to update category');
  }

  return data;
};

export const deleteCategory = async (categoryId) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) {
    throw new Error('Failed to delete category');
  }
};
