import React from 'react';
import { InputOnChange } from '../types';
import Button from './Button';
import Form from './Form';

const transferInputs = [
  {
    labelText: 'Transferir para',
    type: 'text',
    name: 'input-transfer-username',
    id: 'input-transfer-username',
    placeholder: 'username',
    testId: 'input-transfer-username',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
  {
    labelText: 'Valor',
    type: 'text',
    name: 'input-transfer-value',
    id: 'input-transfer-value',
    placeholder: '100,00',
    testId: 'input-transfer-value',
    onChange: () => null as unknown as InputOnChange,
    value: 0,
  },
];

export default function MakeTransferSection() {
  const [showMakeTransfer, setShowMakeTransfer] = React.useState(false);

  const handleSubmit = (e: React.FormEvent, formsData: {[field: string]: string}) => {
    e.preventDefault();
  };

  return (
    <section>
      <h1>Realize transferências Instantaneamente!</h1>
      <Button testId="button-show-transfer-form" text="Transferir" type="button" handleClick={() => setShowMakeTransfer(true)} />
      <div style={showMakeTransfer ? { display: 'block' } : { display: 'none' }}>
        <Button testId="button-close-transfer-form" text="X" type="button" handleClick={() => setShowMakeTransfer(false)} />
        <Form
          testId="form-transfer"
          btnTestId="button-submit-transfer"
          btnText="Transferir"
          inputs={transferInputs}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>

  );
}
