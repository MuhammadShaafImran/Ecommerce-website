import supabase from '../supabase';

export const createOrder = async (userId, cartId, orderData, paymentMethod, addressId) => {
  try {
    console.log('Order Data:', orderData);
    const items = orderData.items;

    console.log('Checkout-items:', items);
    // Process the order using database function (handles payment, stock check, updates, and transaction)
    const { data: orderId, error } = await supabase.rpc(
      'process_order',
      {
        _user_id: userId,
        _product_ids: items.map(item => item.id),
        _quantities: items.map(item => item.quantity),
        _prices: items.map(item => item.price),
        _shipping_cost: orderData.shippingCost,
        _discount_amount: orderData.discountAmount,
        _payment_method: paymentMethod,
        _address_id: addressId
      }
    );

    if (error) {
      console.error('Order processing error:', error);
      throw new Error(error.message || 'Failed to process order');
    }

    // Deactivate the cart
    const { error: cartUpdateError } = await supabase
      .from('carts')
      .update({ is_active: false })
      .eq('id', cartId);

    if (cartUpdateError) {
      console.error('Cart update error:', cartUpdateError);
      // Don't throw here as order is already processed
    }

    // Get the created order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        payments (*),
        addresses (*),
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

    if (orderError) {
      console.error('Error fetching order details:', orderError);
      return { id: orderId }; // Return just the ID if we can't get full details
    }

    return order;
  } catch (error) {
    throw error;
  }
};

// Get all orders for a user
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

  if (error) throw new Error('Failed to get orders');
  return data;
};

// Get a single order by ID
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

  if (error) throw new Error('Failed to get order');
  return data;
};

// Update an order's status
export const updateOrderStatus = async (orderId, status) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) throw new Error('Failed to update order status');
};
