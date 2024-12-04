import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import CategorySelect from '@/components/common/CategorySelect';

const ProductForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id || '',
        title: item.title || '',
        description: item.description || '',
        price: item.price || '',
        quantity: item.quantity || '',
        categoryId: item.category.id || '',
        imageUrl: item.imageUrl || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
        imageUrl: ''
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {item ? 'Edit Product' : 'Add New Product'}
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
        <label className="block text-sm font-medium dark:text-white">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={30}
          maxLength={200}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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

      <div className="space-y-1">
        <label className="block text-sm font-medium dark:text-white">Category </label>

        <CategorySelect
          value={formData.categoryId}
          onChange={handleChange}
          required
          name="categoryId"
        />
      </div>

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
          text={item ? 'Update' : 'Add'}
          bgColor="bg-primary"
          textColor="text-white"
          loading={loading}
          type="submit"
        />
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    categoryId: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
