import React, { useState, useEffect } from 'react';
import Button from "../common/Button";
import get from '../../utils/request';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get({ url: 'categories', method: 'GET' });
        setCategories(response); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8   gap-y-5">
          {/* Mapping through categories */}
          {categories.map((category, index) => (
            <div
              key={category.id} // Ensure each category has a unique id
              className={`relative py-10 px-6 rounded-3xl shadow-sm overflow-hidden flex items-end bg-cover bg-center ${index % 2 === 0 
                ? 'bg-slate-900 text-white'  // Adjusted gradient with opacity and direction
                : 'bg-blue-900 text-white'}`} // Adjusted gradient direction and opacity
              style={{ backgroundImage: `url(${category.image || '/default-image.jpg'})` }} // Optional: Use category image as background
            >
              <div className="relative z-10">
                <div className="mb-6">
                  <p className="text-lg font-semibold text-gray-300">Discover</p>
                  <p className="text-2xl sm:text-3xl font-semibold mb-2">{category.name}</p>
                  <p className="text-sm text-gray-400 mb-4">{category.description}</p>
                  <Button
                    text="Browse"
                    bgColor={index % 2 === 0 ? "bg-primary" : "bg-white"}
                    textColor={index % 2 === 0 ? "text-white" : "text-yellow-600"}
                    className="hover:bg-opacity-90"
                    handler={() => navigate(`/shop?category=${category.id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
