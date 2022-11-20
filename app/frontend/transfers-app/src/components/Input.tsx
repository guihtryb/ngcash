import React, { ChangeEvent } from 'react';

export interface InputProps {
  labelText?: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  testId: string;
  value?: number | string,
  checked?: boolean,
  onChange(e: ChangeEvent): void;
}

export default function Input({
  labelText, type, name, id, placeholder, testId, onChange, value, checked,
}: InputProps) {
  return (
    <label htmlFor={name}>
      {labelText}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        data-testid={testId}
        onChange={onChange}
        value={value}
        checked={checked}
      />
    </label>

  );
}

Input.defaultProps = {
  labelText: '',
  value: '',
  checked: false,
};
