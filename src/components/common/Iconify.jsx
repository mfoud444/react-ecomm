import React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const Iconify = ({ icon, size = '18px', color = 'currentColor', style = {}, ...otherProps }) => {
  return (
    <Icon
      icon={icon}
      style={{ fontSize: size, color, ...style }}
      {...otherProps}
    />
  );
};

Iconify.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  style: PropTypes.object,
};

export default Iconify;
