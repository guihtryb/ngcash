import React from 'react';
import Button from './Button';
import Input, { InputProps } from './Input';

interface FormProps {
  testId: string,
  btnTestId: string,
  btnText: string,
  handleSubmit(e: React.FormEvent): void,
  inputs: InputProps[],
}

export default function Form({
  inputs, handleSubmit, btnTestId, btnText, testId,
}:FormProps) {
  return (
    <form onSubmit={handleSubmit} data-testid={testId}>
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
