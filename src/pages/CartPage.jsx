import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { FaTrash } from 'react-icons/fa';
import Button from '../components/common/Button';

const CartPage = () => {
  // Get cart items from localStorage or state management
  const [cartItems, setCartItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
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
              onClick={() => window.location.href = '/shop'}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Cart Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold dark:text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-semibold dark:text-white">Free</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold dark:text-white">Total</span>
                      <span className="font-semibold dark:text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  text={loading ? "Processing..." : "Checkout"}
                  bgColor="bg-primary"
                  textColor="text-white"
                  className="w-full"
                  disabled={loading}
                />
                <button
                  onClick={clearCart}
                  className="mt-2 w-full text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </button>
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