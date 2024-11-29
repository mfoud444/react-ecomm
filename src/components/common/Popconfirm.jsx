import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Popconfirm = ({ isOpen, onConfirm, onCancel, title, description }) => {
  if (!isOpen) return null;

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
            handler={onConfirm}
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