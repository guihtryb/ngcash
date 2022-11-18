import React from 'react';
import { transfersMock } from '../pages/Home';
import { InputOnChange } from '../types';
import Button from './Button';
import Form from './Form';
import { TransferItemProps } from './TransferItem';

const transferInputs = [
  {
    labelText: 'Transferir para',
    type: 'text',
    name: 'inputTransferUsername',
    id: 'input-transfer-username',
    placeholder: 'username',
    testId: 'input-transfer-username',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
  {
    labelText: 'Valor',
    type: 'text',
    name: 'inputTransferValue',
    id: 'input-transfer-value',
    placeholder: '100,00',
    testId: 'input-transfer-value',
    onChange: () => null as unknown as InputOnChange,
    value: 0,
  },
];

interface MakeTransferSectionProps {
  setTransferDone: React.Dispatch<React.SetStateAction<boolean>>,
  setUserBalance: React.Dispatch<React.SetStateAction<number>>,
  userBalance: number,
}

export default function MakeTransferSection(
  { setTransferDone, setUserBalance, userBalance }: MakeTransferSectionProps,
) {
  const [showMakeTransfer, setShowMakeTransfer] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const handleClose = () => {
    setShowMakeTransfer(false);
    setFeedbackMessage('');
    setTransferDone(false);
  };

  const formatValueInput = (value: string) => {
    let formated = value;
    if (value.includes(',')) {
      formated = formated.replace(',', '.');
      return Number(formated);
    }
    return Number(formated);
  };

  const validateTransfer = (transferValue: string) => {
    const numberRegEx = /[.]?[0-9]/;
    if (!numberRegEx.test(transferValue)) {
      setFeedbackMessage('Insira um valor válido para transferência!');
      return false;
    }

    const formatedValue = formatValueInput(transferValue);

    if (formatedValue > userBalance) {
      setFeedbackMessage('Você não possui saldo suficiente');
      return false;
    }
    return true;
  };

  const doTransfer = (formsData: {[field: string]: string}) => {
    const now = new Date();
    const [day, month, year] = [now.getDate(), now.getMonth() + 1, now.getFullYear()];

    const valid = validateTransfer(formsData.inputTransferValue);

    if (!valid) {
      setTransferDone(false);
    } else {
      const transferValue = formatValueInput(formsData.inputTransferValue);

      const transfer: TransferItemProps = {
        id: transfersMock.length,
        creditedAccount: formsData.inputTransferUsername,
        debitedAccount: 'currentUser',
        createdAt: `${day}/${month}/${year}`,
        value: transferValue,
      };

      const updatedBalance = ((userBalance * 100) - (transferValue * 100)) / 100;

      setUserBalance(updatedBalance);

      transfersMock.push(transfer);
      setFeedbackMessage('Transferência realizada com sucesso!');
      setTransferDone(true);
    }
  };

  const handleSubmit = (e: React.FormEvent, formsData: {[field: string]: string}) => {
    e.preventDefault();
    doTransfer(formsData);
  };

  return (
    <section>
      <h1>Realize transferências Instantaneamente!</h1>
      <Button testId="button-show-transfer-form" text="Transferir" type="button" handleClick={() => setShowMakeTransfer(true)} />
      <div style={showMakeTransfer ? { display: 'block' } : { display: 'none' }}>
        <Button testId="button-close-transfer-form" text="X" type="button" handleClick={handleClose} />
        <Form
          testId="form-transfer"
          btnTestId="button-submit-transfer"
          btnText="Transferir"
          inputs={transferInputs}
          handleSubmit={handleSubmit}
        />
        {
          feedbackMessage && (<p>{feedbackMessage}</p>)
        }
      </div>
    </section>

  );
}
