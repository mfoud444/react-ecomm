import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from "@/utils/request";

const OrderForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    userId: '',
    totalAmount: '',
    shippingAddress: '',
    status: 'pending',
    orderDetails: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    if (item) {
      setFormData({
        userId: item.userId || '',
        totalAmount: item.totalAmount || '',
        shippingAddress: item.shippingAddress || '',
        status: item.status || 'pending',
        orderDetails: item.orderDetails || []
      });
    }
  }, [item]);

  const fetchUsers = async () => {
    try {
      const response = await get({ url: 'users', method: 'GET' });
      setUsers(response.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await get({ url: 'artworks', method: 'GET' });
      setProducts(response.items);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userId) {
      newErrors.userId = 'Customer is required';
    }
    if (!formData.shippingAddress || formData.shippingAddress.length < 10) {
      newErrors.shippingAddress = 'Shipping address must be at least 10 characters';
    }
    if (formData.orderDetails.length === 0) {
      newErrors.orderDetails = 'At least one product is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addOrderDetail = () => {
    if (!selectedProduct || quantity < 1) return;

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const newOrderDetail = {
      artworkId: selectedProduct,
      quantity: quantity,
      price: product.price,
      title: product.title
    };

    setFormData(prev => ({
      ...prev,
      orderDetails: [...prev.orderDetails, newOrderDetail],
      totalAmount: (parseFloat(prev.totalAmount || 0) + (product.price * quantity)).toFixed(2)
    }));

    setSelectedProduct('');
    setQuantity(1);
  };

  const removeOrderDetail = (index) => {
    const removedItem = formData.orderDetails[index];
    setFormData(prev => ({
      ...prev,
      orderDetails: prev.orderDetails.filter((_, i) => i !== index),
      totalAmount: (prev.totalAmount - (removedItem.price * removedItem.quantity)).toFixed(2)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {item ? 'Edit Order' : 'Add New Order'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Customer</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select Customer</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Shipping Address</label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows="3"
            placeholder="Enter shipping address"
          />
          {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Order Items</h3>
          
          <div className="flex gap-4 mb-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.title} - ${product.price}</option>
              ))}
            </select>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              className="w-24 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              type="button"
              onClick={addOrderDetail}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          </div>

          {formData.orderDetails.length > 0 ? (
            <div className="space-y-2">
              {formData.orderDetails.map((detail, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span>{detail.title} x {detail.quantity}</span>
                  <div className="flex items-center gap-4">
                    <span>${(detail.price * detail.quantity).toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => removeOrderDetail(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right font-semibold">
                Total: ${formData.totalAmount}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No items added to order</p>
          )}
          {errors.orderDetails && <p className="text-red-500 text-sm mt-1">{errors.orderDetails}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

OrderForm.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default OrderForm; 