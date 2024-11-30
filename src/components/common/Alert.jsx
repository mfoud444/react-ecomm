import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Iconify from './Iconify';

const Alert = ({ title, type = 'default', duration = 3000, onClose }) => {
  const alertStyles = {
    default: 'bg-gray-100 text-gray-800',
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  const icons = {
    default: 'mdi:information',
    info: 'mdi:information-circle',
    success: 'mdi:check-circle',
    warning: 'mdi:alert',
    error: 'mdi:alert-circle'
  };

  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${alertStyles[type]}`}>
      <Iconify icon={icons[type]} className="mr-2 h-5 w-5" />
      <span className="font-medium">{title}</span>
      <button onClick={onClose} className="ml-4">
        <Iconify icon="mdi:close" className="h-4 w-4" />
      </button>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
};
export default Alert;