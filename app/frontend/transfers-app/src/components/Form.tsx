import React from 'react';
import Button from './Button';
import Input, { InputProps } from './Input';

interface FormProps {
  testId: string,
  btnTestId: string,
  btnText: string,
  inputs: InputProps[],
  handleSubmit: (e: React.FormEvent, formsData: {[field: string]: string }) => void,
}

export default function Form({
  inputs, btnTestId, btnText, testId, handleSubmit,
}: FormProps) {
  const [forms, setForms] = React.useState(
    inputs.reduce((a, b) => ({ ...a, [b.name]: '' }), {
      [inputs[0].name]: '',
    }),
  );

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;

    setForms({ ...forms, [name]: value });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, forms)} data-testid={testId}>
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
            onChange={handleChange}
            value={forms[input.name]}
          />
        ))
      }
      <Button type="submit" testId={btnTestId} text={btnText} />
    </form>
  );
}
