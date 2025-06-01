// pages/client/Checkout.jsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const orderData = location.state;

  // Redirect if no order data
  if (!orderData) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Success Message */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      {/* Order Details */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <p className="text-gray-600">Order #{orderData.orderId}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Quantity</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <p className="text-gray-900 font-medium">{item.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-gray-800">{item.quantity}</td>
                    <td className="px-4 py-4 text-right text-gray-800">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right text-gray-800">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="sm:w-1/2 ml-auto">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>
                  <span>{orderData.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
