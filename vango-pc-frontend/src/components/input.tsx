import React, { InputHTMLAttributes } from 'react';

const Input = (props: Partial<InputHTMLAttributes<HTMLInputElement>>) => {
  return <input {...props} />;
};

export default Input;
