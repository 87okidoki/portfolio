import React, { ButtonHTMLAttributes } from 'react';

const Button = (props: Partial<ButtonHTMLAttributes<Element>>) => {
  return <button {...props}>{props.children}</button>;
};

export default Button;
