// contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import supabase from '../api/supabase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize cart from localStorage and sync with database
  useEffect(() => {
    const initializeCart = async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Try to get active cart from database
        const { data: cart } = await supabase
          .from('carts')
          .select('id')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        if (cart) {
          setCartId(cart.id);
          // Get cart items
          const { data: items } = await supabase
            .from('cart_items')
            .select(`
              *,
              products:product_id (
                id,
                name,
                price,
                product_images (url)
              )
            `)
            .eq('cart_id', cart.id);

          if (items) {
            const formattedItems = items.map(item => ({
              id: item.product_id,
              title: item.products.name,
              price: parseFloat(item.products.price),
              quantity: item.quantity,
              image: item.products.product_images?.[0]?.url || '/placeholder.jpg',
              cartItemId: item.id
            }));
            setCartItems(formattedItems);
          }
        }
      } else {
        // If not logged in, get cart from localStorage
        const savedCart = localStorage.getItem('gameCart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
      setLoading(false);
    };

    initializeCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameCart', JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = async (product, quantity = 1) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        if (!cartId) {
          // Create new cart if needed
          const { data: cart } = await supabase
            .from('carts')
            .insert({ user_id: user.id, is_active: true })
            .select('id')
            .single();
          
          if (cart) setCartId(cart.id);
        }

        // Check product stock before adding
        const { data: productData } = await supabase
          .from('products')
          .select('stock')
          .eq('id', product.id)
          .single();

        if (!productData || productData.stock < quantity) {
          throw new Error('Not enough stock available');
        }
      }

      // Check if product already exists in cart
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        const newQuantity = cartItems[existingItemIndex].quantity + quantity;
        updateQuantity(product.id, newQuantity);
        return;
      }

      // Prepare new item
      const newItem = {
        id: product.id,
        title: product.name,
        price: parseFloat(product.price),
        quantity: quantity,
        image: product.images?.[0]?.url || '/placeholder.jpg'
      };

      // Add to database if logged in
      if (user && cartId) {
        const { data: cartItem } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cartId,
            product_id: product.id,
            quantity: quantity
          })
          .select('id')
          .single();

        if (cartItem) {
          newItem.cartItemId = cartItem.id;
        }
      }

      setCartItems(prev => [...prev, newItem]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Check product stock before updating
      if (user) {
        const { data: productData } = await supabase
          .from('products')
          .select('stock')
          .eq('id', productId)
          .single();

        if (!productData || productData.stock < newQuantity) {
          throw new Error('Not enough stock available');
        }
      }

      const updatedItems = cartItems.map(item => {
        if (item.id === productId) {
          // Update in database if logged in
          if (user && cartId && item.cartItemId) {
            supabase
              .from('cart_items')
              .update({ quantity: newQuantity })
              .eq('id', item.cartItemId);
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert(error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const itemToRemove = cartItems.find(item => item.id === productId);
      
      // Remove from database if logged in
      if (user && cartId && itemToRemove?.cartItemId) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemToRemove.cartItemId);
      }

      setCartItems(prev => prev.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Clear database cart if logged in
      if (user && cartId) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cartId);
        
        await supabase
          .from('carts')
          .update({ is_active: false })
          .eq('id', cartId);
        
        setCartId(null);
      }

      setCartItems([]);
      localStorage.removeItem('gameCart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const value = {
    cartItems,
    cartId,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};