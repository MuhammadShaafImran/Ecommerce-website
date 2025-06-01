import supabase from '../supabase';

// Get active cart by user ID
export const getCartByUserId = async (userId) => {
    try {
        const { data: cart, error } = await supabase
            .from('carts')
            .select('id')
            .eq('user_id', userId)
            .eq('is_active', true)
            .single();

        if (error) throw error;
        return cart;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
};

// Get cart items with product details
export const getCartItems = async (cartId) => {
    try {
        const { data, error } = await supabase
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

        if (error) throw error;
        return data?.map(item => ({
            id: item.product_id,
            quantity: item.quantity,
            ...item.products,
            image: item.products.product_images?.[0]?.url
        })) || [];
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
};

// Check if products are in stock
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
        return false;
    }
};
