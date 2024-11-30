import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; 
import Iconify from '@/components/common/Iconify';

const Avatar = ({ name, type }) => {
  const navigate = useNavigate();  
  const userIcons = {
    Admin: 'mdi:shield-account', 
    Customer: 'mdi:account-circle', 
    Artist: 'mdi:palette', 
  };

  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div
      className="flex items-center justify-center space-x-3 cursor-pointer"
      onClick={handleProfileClick}
    >

<span className="font-medium text-lg">{name}</span>
  
      <Iconify
        icon={userIcons[type] || 'mdi:account'} 
        width={20}
        height={20}
      />
      {/* Render user name */}
    
    </div>
  );
};

// PropTypes for validation
Avatar.propTypes = {
  name: PropTypes.string.isRequired, 
  type: PropTypes.oneOf(['Admin', 'Customer', 'Artist']).isRequired, 
};

export default Avatar;
