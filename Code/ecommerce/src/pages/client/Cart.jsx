// pages/Cart.jsx
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import Button from '../../components/ui/Button';
import { CartContext } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { checkStockAvailability } from '../../api/cart/read';
import { createCart, updateCartItemQuantity, removeFromCart, clearCart, applyCoupon } from '../../api/cart/write';
import { createOrder } from '../../api/order/orders';
import supabase from '../../api/supabase';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart: removeItemFromCart, clearCart: clearCartItems, cartId } = useContext(CartContext);
  const { user, isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [orderError, setOrderError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [showPaymentError, setShowPaymentError] = useState(false);
  const [showAddressError, setShowAddressError] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    if (!user && localStorage.getItem('redirectAfterLogin') !== 'cart') {
      localStorage.setItem('redirectAfterLogin', 'cart');
    }
  }, [user]);
  
  // Fetch user addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      if (user?.id) {
        const { data: addresses, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id);
          
        if (!error && addresses) {
          setUserAddresses(addresses);
        }
      }
    };
    
    fetchAddresses();
  }, [user]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping - discount;

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Check stock availability
      const stockAvailable = await checkStockAvailability([{
        id: itemId,
        quantity: newQuantity
      }]);

      if (!stockAvailable) {
        setOrderError('Not enough stock available');
        return;
      }

      if (cartId) {
        await updateCartItemQuantity(cartId, itemId, newQuantity);
      }
      
      updateQuantity(itemId, newQuantity);
      setOrderError('');
    } catch (error) {
      console.error('Error updating quantity:', error);
      setOrderError('Error updating quantity. Please try again.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      if (cartId) {
        await removeFromCart(cartId, itemId);
      }
      removeItemFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
      setOrderError('Error removing item. Please try again.');
    }
  };

  const handleClearCart = async () => {
    try {
      if (cartId) {
        await clearCart(cartId);
      }
      clearCartItems();
      setDiscount(0);
      setCouponCode('');
      setCouponSuccess('');
      setCouponError('');
    } catch (error) {
      console.error('Error clearing cart:', error);
      setOrderError('Error clearing cart. Please try again.');
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    try {
      setLoading(true);
      setCouponError('');
      setCouponSuccess('');

      const result = await applyCoupon(couponCode);
      
      if (result.valid) {
        const discountAmount = subtotal * result.discount;
        setDiscount(discountAmount);
        setCouponSuccess('Coupon applied successfully!');
      } else {
        setCouponError('Invalid coupon code');
        setDiscount(0);
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      setCouponError('Error applying coupon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      setOrderError('');
      setShowPaymentError(false);
      setShowAddressError(false);

      // Check if user is logged in
      if (!user?.id) {
        console.log('Is Authenticated:', isAuthenticated);
        localStorage.setItem('redirectAfterLogin', 'cart');
        navigate('/login');
        return;
      }

      // Validate payment method and address
      if (!selectedPaymentMethod) {
        setShowPaymentError(true);
        throw new Error('Please select a payment method');
      }

      if (!selectedAddressId) {
        setShowAddressError(true);
        throw new Error('Please select a delivery address');
      }

      // Validate cart is not empty
      if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Ensure we have a valid cart
      if (!cartId) {
        const cart = await createCart(user.id);
        if (!cart) {
          throw new Error('Failed to create cart');
        }
      }

      // Check stock availability
      const stockAvailable = await checkStockAvailability(cartItems);
      if (!stockAvailable) {
        throw new Error('Some items in your cart are no longer in stock');
      }

      // Create order with payment method and address
      const orderData = {
        shippingCost: shipping,
        discountAmount: discount,
        total: total,
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };      const order = await createOrder(user.id, cartId, orderData, selectedPaymentMethod, selectedAddressId);

      // Clear cart after successful order
      if (cartId) {
        await clearCart(cartId);
      }
      clearCartItems();
      setDiscount(0);
      setCouponCode('');
      setCouponSuccess('');
      setCouponError('');
      
      // Navigate to order confirmation
      navigate('/checkout', { 
        state: { 
          orderId: order.id,
          total,
          items: cartItems
        } 
      });

    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <ShoppingBag size={60} className="text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <Button variant="primary" className="flex items-center gap-2 px-8 py-3">
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
      
      {orderError && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {orderError}
        </div>
      )}
      
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
              <Button variant="outline" onClick={handleClearCart} className='px-8 py-[0.5rem]' size='medium'>
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
            </div>            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="relative">
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-lg bg-white appearance-none cursor-pointer focus:border-red-500 focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select payment method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="easypaisa">Easypaisa</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="sadapay">SadaPay</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {selectedPaymentMethod && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-center gap-4">
                    {selectedPaymentMethod === 'credit_card' ? (
                      <>
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Credit Card</h4>
                          <p className="text-sm text-gray-500">Pay securely with your credit card</p>
                        </div>
                      </>
                    ) : selectedPaymentMethod === 'easypaisa' ? (
                      <>
                        <img src="/media/Easypaisa-Icon.jpg" alt="Easypaisa" className="w-12 h-12 object-contain rounded-lg" />
                        <div>
                          <h4 className="font-medium">Easypaisa</h4>
                          <p className="text-sm text-gray-500">Pay with your Easypaisa account</p>
                        </div>
                      </>
                    ) : selectedPaymentMethod === 'jazzcash' ? (
                      <>
                        <img src="/media/Jazzcash-Icon.jpg" alt="JazzCash" className="w-12 h-12 object-contain rounded-lg" />
                        <div>
                          <h4 className="font-medium">JazzCash</h4>
                          <p className="text-sm text-gray-500">Pay with your JazzCash account</p>
                        </div>
                      </>
                    ) : selectedPaymentMethod === 'sadapay' ? (
                      <>
                        <img src="/media/Sadapay-Icon.jpg" alt="SadaPay" className="w-12 h-12 object-contain rounded-lg" />
                        <div>
                          <h4 className="font-medium">SadaPay</h4>
                          <p className="text-sm text-gray-500">Pay with your SadaPay account</p>
                        </div>
                      </>
                    ) : selectedPaymentMethod === 'cash_on_delivery' ? (
                      <>
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Cash on Delivery</h4>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              )}

              {showPaymentError && !selectedPaymentMethod && (
                <p className="text-red-500 text-sm mt-3">Please select a payment method</p>
              )}
            </div>

            {/* Delivery Address Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Delivery Address</h3>
              {userAddresses.length > 0 ? (
                <div className="space-y-2">
                  {userAddresses.map((address) => (
                    <label key={address.id} className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryAddress"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={(e) => setSelectedAddressId(Number(e.target.value))}
                        className="h-4 w-4 text-red-500"
                      />
                      <span className="ml-2">
                        {address.addressline1}, {address.city}, {address.country}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  No addresses found. Please add an address in your profile.
                </div>
              )}
              {showAddressError && !selectedAddressId && (
                <p className="text-red-500 text-sm mt-1">Please select a delivery address</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <select 
                className="border border-gray-300 rounded px-4 py-2 w-full"
                value={selectedAddressId || ''}
                onChange={(e) => setSelectedAddressId(e.target.value)}
              >
                <option value="" disabled>Select an address</option>
                {userAddresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {`${address.addressline1}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`}
                  </option>
                ))}
              </select>
              {showAddressError && <p className="text-red-500 text-sm mt-2">Please select a delivery address</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex gap-2">
                <Button 
                  variant={selectedPaymentMethod === 'credit_card' ? 'primary' : 'outline'} 
                  className="flex-1"
                  onClick={() => setSelectedPaymentMethod('credit_card')}
                >
                  Credit Card
                </Button>
                <Button 
                  variant={selectedPaymentMethod === 'paypal' ? 'primary' : 'outline'} 
                  className="flex-1"
                  onClick={() => setSelectedPaymentMethod('paypal')}
                >
                  PayPal
                </Button>
              </div>
              {showPaymentError && <p className="text-red-500 text-sm mt-2">Please select a payment method</p>}
            </div>
            
            <Button 
              variant="primary" 
              className="w-full mb-4" 
              size="lg" 
              onClick={placeOrder}
              disabled={loading}
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? 'Processing...' : 'Proceed to Checkout'}
                <ArrowRight size={16} />
              </div>
            </Button>
            
            <Link to="/products">
              <Button variant="ghost" className="w-full px-8 py-[0.5rem]" size='medium'>
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