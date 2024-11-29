import React, { useState, useEffect } from 'react';
import Button from "../common/Button";
import get from '../../utils/request';  

// Assuming that category images and names are returned from the API
const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await get({ url: 'categories', method: 'GET' });
            setCategories(response); 
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
}, []);

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mapping through categories */}
          {categories.map((category, index) => (
            <div
              key={category.id} // Ensure each category has a unique id
              className={`py-10 pl-5 rounded-3xl relative h-[320px] flex items-end ${index % 2 === 0 ? 'bg-gradient-to-br from-black/90 to-black/70 text-white' : 'bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white'}`}
            >
              <div>
                <div className="mb-4">
                  <p className="mb-[2px] text-gray-400">View</p>
                  <p className="text-2xl font-semibold mb-[2px]">the</p>
                  <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">{category.name}</p>
                  <Button
                    text="Browse"
                    bgColor={index % 2 === 0 ? "bg-primary" : "bg-white"}
                    textColor={index % 2 === 0 ? "text-white" : "text-brandYellow"}
                  />
                </div>
              </div>
              {/* Image for each category (replace with actual category image URL) */}
              {/* <img 
                src={category.image} 
                alt={category.name} 
                className="w-[320px] absolute bottom-0" 
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
