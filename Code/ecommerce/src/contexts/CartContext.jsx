// contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import supabase from '../api/supabase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize cart whenever user changes
  useEffect(() => {
    const initializeCart = async () => {
      try {
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
                  inventory (stock),
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
                stock: item.products.inventory?.stock || 0,
                image: item.products.product_images?.[0]?.url || '/placeholder.jpg',
                cartItemId: item.id
              }));
              setCartItems(formattedItems);
            }
          }
        } else {
          // For non-logged in users, use localStorage
          const savedCart = localStorage.getItem('gameCart');
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
          setCartId(null); // Clear cartId when logged out
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, [user]); // Re-run when user changes (login/logout)

  // Save to localStorage for non-logged in users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('gameCart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
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
      }

      // Check if product already exists
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
        stock: product.inventory?.stock || 0,
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
      throw error;
    }
  };

  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    try {
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
      throw error;
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
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
      throw error;
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
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
      if (!user) {
        localStorage.removeItem('gameCart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
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