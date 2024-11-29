import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/common/Button';
import { Input } from '@/components/common/Input';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        quantity: product.quantity || '',
        categoryId: product.categoryId || '',
        imageUrl: product.imageUrl || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        minLength={6}
        maxLength={30}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={30}
          maxLength={200}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        />
      </div>

      <Input
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        min={1}
        step="0.01"
      />

      <Input
        label="Quantity"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        required
        min={1}
      />

      <Input
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          text="Cancel"
          bgColor="bg-gray-500"
          textColor="text-white"
          handler={onCancel}
        />
        <Button
          text={product ? 'Update' : 'Add'}
          bgColor="bg-primary"
          textColor="text-white"
          type="submit"
        />
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ProductForm;

