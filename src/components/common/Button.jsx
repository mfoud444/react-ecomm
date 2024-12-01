import React from "react";
import PropTypes from "prop-types";

const Button = ({
  text,
  bgColor,
  textColor,
  icon,
  handler = () => {},
  className = "",
  disabled = false,
 loading = false,
}) => {
  return (
    <button
      onClick={!disabled ? handler : undefined}
      disabled={disabled}
      className={`${bgColor} ${textColor} ${className} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"}
        duration-300 py-2 px-8 rounded-full
        flex items-center justify-center gap-2`}
    >
      {loading ? (
        <span className="loader animate-spin border-2 border-t-transparent border-white rounded-full h-5 w-5"></span>
      ) : (
        <>
          {icon && <span className="icon">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string.isRequired,
  icon: PropTypes.element,
  handler: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
