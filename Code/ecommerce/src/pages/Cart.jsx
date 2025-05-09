// pages/Cart.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
    setDiscount(0);
    setCouponCode('');
    setCouponSuccess('');
    setCouponError('');
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    setLoading(true);
    setCouponError('');
    setCouponSuccess('');
    
    // Simulated coupon validation
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'SAVE20') {
        const discountAmount = subtotal * 0.2;
        setDiscount(discountAmount);
        setCouponSuccess('Coupon applied successfully!');
      } else {
        setCouponError('Invalid coupon code');
        setDiscount(0);
      }
      setLoading(false);
    }, 800);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <ShoppingBag size={60} className="text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <Button variant="primary" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-4 font-medium text-gray-600">Product</th>
                  <th className="p-4 font-medium text-gray-600">Price</th>
                  <th className="p-4 font-medium text-gray-600">Quantity</th>
                  <th className="p-4 font-medium text-gray-600">Total</th>
                  <th className="p-4 font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <div className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <Link to={`/product/${item.id}`} className="text-gray-800 hover:text-red-500">
                          {item.title}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 text-gray-800">${item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <input 
                          type="text" 
                          value={item.quantity} 
                          className="w-12 h-8 border-t border-b border-gray-300 text-center"
                          readOnly
                        />
                        <button 
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <button 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  className="border border-gray-300 rounded px-4 py-2 flex-grow"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={handleApplyCoupon}
                  disabled={loading}
                >
                  {loading ? 'Applying...' : 'Apply Coupon'}
                </Button>
              </div>
              {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
              {couponSuccess && <p className="text-green-500 text-sm mt-2">{couponSuccess}</p>}
            </div>
            <div>
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button variant="primary" className="w-full mb-4" size="lg">
              <div className="flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={16} />
              </div>
            </Button>
            
            <Link to="/products">
              <Button variant="ghost" className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <ArrowLeft size={16} />
                  Continue Shopping
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;