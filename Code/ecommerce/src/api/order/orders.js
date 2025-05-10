import supabase from '../supabase';

export const createOrder = async (userId, cartId, orderData) => {
  // Start a PostgreSQL transaction
  const { error: beginError } = await supabase.rpc('begin_transaction');
  if (beginError) throw new Error('Failed to begin transaction');
  // Start a transaction
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: 'pending',
      total_amount: orderData.total,
      shipping_address: orderData.shippingAddress,
      payment_method: orderData.paymentMethod,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error('Failed to create order');
  }

  // Get cart items
  const { data: cartItems, error: cartError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartId);

  if (cartError) {
    throw new Error('Failed to get cart items');
  }
  try {
    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_time: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw new Error('Failed to create order items');

    // Update product stock (you may need to add a stock column to your products table)
    for (const item of cartItems) {
      const { error: stockError } = await supabase.rpc('update_product_stock', {
        p_id: item.product_id,
        quantity: item.quantity
      });
      
      if (stockError) throw new Error('Failed to update product stock');
    }

    // Clear the cart
    const { error: clearError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (clearError) throw new Error('Failed to clear cart');

    // Mark cart as inactive
    const { error: cartError } = await supabase
      .from('carts')
      .update({ is_active: false })
      .eq('id', cartId);

    if (cartError) throw new Error('Failed to update cart status');

    // Commit transaction
    const { error: commitError } = await supabase.rpc('commit_transaction');
    if (commitError) throw new Error('Failed to commit transaction');

    return order;
  } catch (error) {
    // Rollback transaction on any error
    const { error: rollbackError } = await supabase.rpc('rollback_transaction');
    if (rollbackError) console.error('Failed to rollback transaction:', rollbackError);
    throw error;
  }
};

export const getOrdersByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          description,
          price,
          product_images (
            url
          )
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to get orders');
  }

  return data;
};

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          description,
          price,
          product_images (
            url
          )
        )
      )
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    throw new Error('Failed to get order');
  }

  return data;
};

export const updateOrderStatus = async (orderId, status) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    throw new Error('Failed to update order status');
  }
};
