import supabase from '../supabase';

export const getCartByUserId = async (userId) => {
  const { data: cart, error } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single();

  return { cart, error };
};

export const createCart = async (userId) => {
  const { data: newCart, error } = await supabase
    .from('carts')
    .insert({ user_id: userId, is_active: true })
    .select('id')
    .single();
    
  return { newCart, error };
};

export const getCartItems = async (cartId) => {
  const { data: items, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      products (
        id,
        name,
        price,
        product_images (
          url
        )
      )
    `)
    .eq('cart_id', cartId);

  return { items, error };
};

export const addCartItem = async (cartId, productId, quantity) => {
  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      cart_id: cartId,
      product_id: productId,
      quantity: quantity
    })
    .select('id')
    .single();

  return { data, error };
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity: quantity })
    .eq('id', cartItemId);

  return { data, error };
};

export const removeCartItem = async (cartItemId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);

  return { error };
};

export const clearCart = async (cartId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId);

  return { error };
};

export const checkStockAvailability = async (items) => {
  try {
    const productIds = items.map(item => item.id);
    const quantities = items.map(item => item.quantity);

    const { data, error } = await supabase.rpc(
      'check_stock_availability',
      { _product_ids: productIds, _quantities: quantities }
    );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking stock:', error);
    throw error;
  }
};

export const processOrder = async (userId, items, shippingCost, discountAmount) => {
  try {
    const productIds = items.map(item => item.id);
    const quantities = items.map(item => item.quantity);
    const prices = items.map(item => item.price);

    const { data, error } = await supabase.rpc(
      'process_order',
      {
        _user_id: userId,
        _product_ids: productIds,
        _quantities: quantities,
        _prices: prices,
        _shipping_cost: shippingCost,
        _discount_amount: discountAmount
      }
    );

    if (error) throw error;
    return data; // Returns the order ID
  } catch (error) {
    console.error('Error processing order:', error);
    throw error;
  }
};
