import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id || '',
        name: category.name || '',
        description: category.description || '',
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {category ? 'Edit Category' : 'Add New Category'}
      </h2>

      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        minLength={2}
        maxLength={10}
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
          minLength={10}
          maxLength={100}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          text="Cancel"
          bgColor="bg-gray-500"
          textColor="text-white"
          handler={onCancel}
        />
        <Button
          text={category ? 'Update' : 'Add'}
          bgColor="bg-primary"
          textColor="text-white"
          loading={loading}
          type="submit"
        />
      </div>
    </form>
  );
};

CategoryForm.propTypes = {
  category: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default CategoryForm; 