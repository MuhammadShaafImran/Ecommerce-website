// contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (replace with your actual credentials)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem('gameCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user from session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  // Get or create active cart for user
  useEffect(() => {
    const getCart = async () => {
      if (!userId) {
        return;
      }
      
      // Check for active cart for user
      let { data: cart, error } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();
      
      if (error || !cart) {
        // Create new cart if none exists
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: userId, is_active: true })
          .select('id')
          .single();
          
        if (createError) {
          console.error('Error creating cart:', createError);
          return;
        }
        
        cart = newCart;
      }
      
      setCartId(cart.id);
      
      // Get cart items from database
      const { data: items, error: itemsError } = await supabase
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
        .eq('cart_id', cart.id);
      
      if (itemsError) {
        console.error('Error fetching cart items:', itemsError);
        return;
      }
      
      // Transform data to match our cart items format
      if (items && items.length > 0) {
        const formattedItems = items.map(item => ({
          id: item.product_id,
          title: item.products.name,
          price: parseFloat(item.products.price),
          quantity: item.quantity,
          image: item.products.product_images.length > 0 
            ? item.products.product_images[0].url 
            : '/api/placeholder/100/100',
          cartItemId: item.id
        }));
        
        setCartItems(formattedItems);
      }
    };
    
    if (!loading) {
      getCart();
    }
  }, [userId, loading]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gameCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      const newQuantity = cartItems[existingItemIndex].quantity + quantity;
      updateQuantity(product.id, newQuantity);
      return;
    }
    
    const newItem = {
      id: product.id,
      title: product.name,
      price: parseFloat(product.price),
      quantity: quantity,
      image: product.images && product.images.length > 0 
        ? product.images[0].url 
        : '/api/placeholder/100/100'
    };
    
    // If logged in, save to database
    if (userId && cartId) {
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cartId,
          product_id: product.id,
          quantity: quantity
        })
        .select('id')
        .single();
        
      if (error) {
        console.error('Error adding item to cart:', error);
        return;
      }
      
      newItem.cartItemId = data.id;
    }
    
    setCartItems(prevItems => [...prevItems, newItem]);
  };

  // Update item quantity
  const updateQuantity = async (productId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === productId) {
        // If logged in, update in database
        if (userId && cartId && item.cartItemId) {
          supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('id', item.cartItemId)
            .then(({ error }) => {
              if (error) console.error('Error updating cart item:', error);
            });
        }
        
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const itemToRemove = cartItems.find(item => item.id === productId);
    
    // If logged in, remove from database
    if (userId && cartId && itemToRemove?.cartItemId) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemToRemove.cartItemId);
        
      if (error) {
        console.error('Error removing cart item:', error);
      }
    }
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Clear cart
  const clearCart = async () => {
    // If logged in, remove all items from database
    if (userId && cartId) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);
        
      if (error) {
        console.error('Error clearing cart:', error);
      }
    }
    
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};