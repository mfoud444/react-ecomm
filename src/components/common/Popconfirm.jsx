import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Popconfirm = ({ isOpen, onConfirm, onCancel, title, description }) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await onConfirm();
      if (response?.status === 204 || response === undefined) {
        console.log("Action successfully completed with no content.");
      } else {
        console.log("Action completed successfully:", response);
      }
    } catch (error) {
     
      if (error.code === 204) {
        console.log("Action successfully completed (handled in error block).");
      } else {
        console.error("Error confirming action:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 space-y-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <div className="flex justify-end space-x-2">
          <Button
            text="Cancel"
            bgColor="bg-gray-500"
            textColor="text-white"
            handler={onCancel}
          />
          <Button
            text="Confirm"
            bgColor="bg-red-500"
            textColor="text-white"
            handler={handleSubmit}  // Use handleSubmit to manage loading state
            loading={loading}  // Pass loading state to the button
          />
        </div>
      </div>
    </div>
  );
};

Popconfirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default Popconfirm;
