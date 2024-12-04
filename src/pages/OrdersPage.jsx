import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Button from '../components/common/Button';
import get from '../utils/request';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { FaEye } from 'react-icons/fa';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await get({ url: 'orders/my-orders', method: 'GET'  });
      console.log(response);
      
      setOrders(response);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const orderDetails = await get({ url: `orders/${orderId}`,  method: 'GET'  });
      setSelectedOrder(orderDetails);
      setShowDetails(true);
    } catch (err) {
      setError('Failed to fetch order details');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <LoadingSkeleton className="h-64" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">My Orders</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No orders found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-semibold dark:text-white mt-2">
                      Total: ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    text="View Details"
                    bgColor="bg-primary"
                    textColor="text-white"
                    className="flex items-center gap-2"
                    handler={() => handleViewDetails(order.id)}
                  >
                    <FaEye />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {showDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-semibold dark:text-white">
                    Order Details
                  </h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order ID: {selectedOrder.id}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Shipping Address: {selectedOrder.shippingAddress}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Customer: {selectedOrder.user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Phone: {selectedOrder.user.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Email: {selectedOrder.user.email}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="font-semibold mb-3 dark:text-white">
                      Items
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.orderDetails.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-medium dark:text-white">
                                {item.artwork.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Category: {item.artwork.category.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Quantity: {item.quantity}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Price per item: ${item.artwork.price}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium dark:text-white">
                            ${(item.artwork.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold dark:text-white">Total</span>
                      <span className="font-semibold dark:text-white">
                        ${selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    text="Close"
                    bgColor="bg-gray-500"
                    textColor="text-white"
                    handler={() => setShowDetails(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage; 