import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import supabase from '../../api/supabase';

const CustomerManager = ({ searchQuery }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('users')
        .select(`
          *,
          addresses (*),
          orders (
            id,
            status,
            created_at,
            order_items (
              quantity,
              products (name, price)
            )
          )
        `)
        .ilike('username', `%\${searchQuery}%`);

      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Customers</h2>

      <div className="grid grid-cols-1 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{customer.full_name || customer.username}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {customer.email}
                    </div>
                    {customer.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {customer.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Member since {new Date(customer.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            {customer.addresses && customer.addresses.length > 0 && (
              <div className="px-6 py-4 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Shipping Addresses</h4>
                <div className="space-y-3">
                  {customer.addresses.map((address) => (
                    <div key={address.id} className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                      <div className="text-sm text-gray-600">
                        <p>{address.addressline1}</p>
                        {address.addressline2 && <p>{address.addressline2}</p>}
                        <p>
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {customer.orders && customer.orders.length > 0 && (
              <div className="px-6 py-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Order History</h4>
                <div className="space-y-4">
                  {customer.orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full \${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.order_items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.quantity}x {item.products.name}
                            </span>
                            <span className="text-gray-900">
                              ${(item.quantity * item.products.price).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerManager;
