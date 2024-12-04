import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { FaTrash } from 'react-icons/fa';
import Button from '../components/common/Button';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../utils/cart';
import post from '../utils/request';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const totalPrice = cartItems.reduce((total, item) => 
    total + (parseFloat(item.price) * item.quantity), 0
  );

  const handleRemoveItem = (itemId) => {
    const updatedCart = removeFromCart(itemId);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = updateQuantity(itemId, newQuantity);
    setCartItems(updatedCart);
  };

  const validateAddress = () => {
    if (!shippingAddress) {
      setAddressError('Shipping address is required');
      return false;
    }
    if (shippingAddress.length < 10) {
      setAddressError('Address should be at least 10 characters');
      return false;
    }
    if (shippingAddress.length > 30) {
      setAddressError('Address should not exceed 30 characters');
      return false;
    }
    setAddressError('');
    return true;
  };

  const handleCheckout = async () => {
    if (!cartItems.length) return;
    if (!validateAddress()) return;

    setLoading(true);
    try {
      const orderData = {
        totalAmount: totalPrice,
        shippingAddress: shippingAddress,
        orderDetails: cartItems.map(item => ({
          artworkId: item.id,
          quantity: item.quantity
        }))
      };

      await post({
        url: 'orders/add',
        data: orderData
      });

      clearCart();
      setCartItems([]);
      navigate('/profile');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
            <Button
              text="Continue Shopping"
              bgColor="bg-primary"
              textColor="text-white"
              handler={() => navigate('/shop')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Cart Summary</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      value={shippingAddress}
                      onChange={(e) => {
                        setShippingAddress(e.target.value);
                        setAddressError('');
                      }}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter your shipping address"
                    />
                    {addressError && (
                      <p className="text-red-500 text-sm mt-1">{addressError}</p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-semibold dark:text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="font-semibold dark:text-white">Total</span>
                      <span className="font-semibold dark:text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {error && <p className="text-red-500 mt-4 mb-4">{error}</p>}
                
                <Button
                  text={loading ? "Processing..." : "Checkout"}
                  bgColor="bg-primary"
                  textColor="text-white"
                  className="w-full mt-4"
                  disabled={loading}
                  handler={handleCheckout}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage; 