import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, bgColor, textColor, icon, handler = () => {}, className = "" }) => {
  return (
    <button
      onClick={handler}
      className={`${bgColor} ${textColor} ${className} 
        cursor-pointer hover:scale-105
        duration-300 py-2 px-8 rounded-full
        flex items-center justify-center gap-2`}
    >
      {icon && <span className="icon">{icon}</span>}
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  icon: PropTypes.element,
  handler: PropTypes.func,
  className: PropTypes.string, 
};

export default Button;
