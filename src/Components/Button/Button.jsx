import React from 'react';
import './Button.css';

function Button({
  type = 'default',
  className = '',
  margin = '4px 0px',
  width = '100%',
  fontSize = '16px',
  bgcolor = '',
  children,
  ...props
}) {
 

  const buttonStyle = {
    fontSize: fontSize,
    width: width,
    margin: margin,
    backgroundColor:bgcolor
  };

  return (
    <button className={`button ${className}`} style={buttonStyle} {...props}>
      {children}
    </button>
  );
}

export default Button;
