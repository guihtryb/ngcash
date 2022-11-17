import React from 'react';

export interface InputProps {
  labelText?: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  testId: string;
}

export default function Input({
  labelText, type, name, id, placeholder, testId,
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
      />
    </label>

  );
}

Input.defaultProps = {
  labelText: '',
};
