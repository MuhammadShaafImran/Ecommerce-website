import supabase from '../supabase';

// Create a new cart for a user
export const createCart = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('carts')
            .insert({ user_id: userId, is_active: true })
            .select('id')
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
};

// Add or update item in cart
export const addOrUpdateCartItem = async (cartId, productId, quantity) => {
    try {
        // First, check if item exists
        const { data: existing } = await supabase
            .from('cart_items')
            .select('id')
            .match({ cart_id: cartId, product_id: productId })
            .single();

        if (existing) {
            // Update existing item
            const { data, error } = await supabase
                .from('cart_items')
                .update({ quantity })
                .match({ cart_id: cartId, product_id: productId })
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Add new item
            const { data, error } = await supabase
                .from('cart_items')
                .insert({
                    cart_id: cartId,
                    product_id: productId,
                    quantity: quantity
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    } catch (error) {
        console.error('Error adding/updating cart item:', error);
        return null;
    }
};

// Remove item from cart
export const removeFromCart = async (cartId, productId) => {
    try {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .match({ cart_id: cartId, product_id: productId });

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return false;
    }
};

// Clear cart
export const clearCart = async (cartId) => {
    try {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
    }
};

// Apply coupon to cart
export const applyCoupon = async (couponCode) => {
    try {
        // This is a simplified coupon validation
        // In a real application, you would check against a coupons table
        if (couponCode.toUpperCase() === 'SAVE20') {
            return {
                valid: true,
                discount: 0.2 // 20% discount
            };
        }
        return {
            valid: false,
            discount: 0
        };
    } catch (error) {
        console.error('Error applying coupon:', error);
        return {
            valid: false,
            discount: 0
        };
    }
};

export const updateCartItemQuantity = async (cartItemId, quantity) =>{

}