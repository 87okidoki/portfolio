import React, { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';

const Checkbox = (props: Partial<Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>>) => {
  const randomId = Math.random().toFixed(6).toString().slice(2);
  const inputProps = { ...props, children: undefined };
  const propChecked = props.checked || false;

  const [isChecked, setIsChecked] = useState(propChecked);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.currentTarget.checked);
    props.onChange?.(e);
  };

  useEffect(() => {
    if (isChecked !== propChecked) {
      setIsChecked(propChecked);
    }
  }, [propChecked]);

  return (
    <>
      <div className="checkbox">
        <input {...inputProps} type="checkbox" id={`check-${randomId}`} checked={isChecked} onChange={onChange} />
        <label className="checkbox-label" htmlFor={`check-${randomId}`}>
          <span className="text">{props.children}</span>
        </label>
      </div>
      {/* <label className="checkbox">
        <Input {...inputProps} type="checkbox" />
        <span className="text">{props.children}</span>
      </label> */}
    </>
  );
};

export default Checkbox;
