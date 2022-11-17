import React from 'react';
import Button from './Button';
import Input, { InputProps } from './Input';

interface FormProps {
  inputs: InputProps[],
  handleSubmit(e: React.FormEvent): void,
  btnTestId: string,
  btnText: string,
}

export default function Form({
  inputs, handleSubmit, btnTestId, btnText,
}:FormProps) {
  return (
    <form onSubmit={handleSubmit}>
      {
      inputs.map((input) => (
        <Input
          id={input.id}
          labelText={input.labelText}
          name={input.name}
          placeholder={input.placeholder}
          testId={input.testId}
          type={input.type}
          key={input.id}
        />
      ))
    }
      <Button type="submit" testId={btnTestId} text={btnText} />
    </form>
  );
}
