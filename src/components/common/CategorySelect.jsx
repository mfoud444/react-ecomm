import React, { useState, useEffect } from 'react';
import get from '@/utils/request';
import PropTypes from 'prop-types';

const CategorySelect = ({ value, onChange, required = false, name = 'categoryId' }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await get({ url: 'categories', method: 'GET' });
        setCategories(response);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <select
        disabled
        className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
      >
        <option>Loading categories...</option>
      </select>
    );
  }

  if (error) {
    return (
      <div>
        <select
          className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 text-red-900"
          disabled
        >
          <option>Error loading categories</option>
        </select>
        <p className="mt-1 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <select
      name={name}
      defaultValue={value || ''} // This is the key change to control selection
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary focus:border-primary"
    >
  
      {categories.map((category) => (
        <option
          key={category.id}
         
          value={category.id}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
};

CategorySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  name: PropTypes.string
};

export default CategorySelect;