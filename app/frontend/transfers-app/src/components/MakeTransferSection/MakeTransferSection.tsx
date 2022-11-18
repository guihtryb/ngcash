import React from 'react';
import { transfersMock } from '../../pages/Home';
import { InputOnChange } from '../../types';
import Button from '../Button/Button';
import Form from '../Form';
import { TransferItemProps } from '../TransferItem';

import './index.css';

const transferInputs = [
  {
    labelText: 'Transferir para',
    type: 'text',
    name: 'inputTransferUsername',
    id: 'input-transfer-username',
    placeholder: 'Nome do usuário',
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

  const validateTransferValue = (transferValue: string) => {
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

    if (formatedValue <= 0) {
      setFeedbackMessage('Insira um valor válido para transferência!');
      return false;
    }
    return true;
  };

  const validateTransferUsername = (username: string) => {
    if (!username || username.length < 3) {
      setFeedbackMessage('Insira um nome de usuário válido!');
      return false;
    }
    return true;
  };

  const validateTransfer = (transferValue: string, username: string) => {
    const [validValue, validateUsername] = [
      validateTransferValue(transferValue),
      validateTransferUsername(username),
    ];

    return validValue && validateUsername;
  };

  const doTransfer = ({ inputTransferValue, inputTransferUsername }: {[field: string]: string}) => {
    const now = new Date();
    const [day, month, year] = [now.getDate(), now.getMonth() + 1, now.getFullYear()];

    const valid = validateTransfer(inputTransferValue, inputTransferUsername);

    if (!valid) {
      setTransferDone(false);
    } else {
      const transferValue = formatValueInput(inputTransferValue);

      const transfer: TransferItemProps = {
        id: transfersMock.length,
        creditedAccount: inputTransferUsername,
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
    <section className="section">
      <h1 className="title">Realize transferências Instantaneamente!</h1>
      <Button testId="button-show-transfer-form" text="Transferir" type="button" handleClick={() => setShowMakeTransfer(true)} />
      <div className={`modal-container ${showMakeTransfer ? 'open' : ''}`}>
        <div className="modal">
          <Button testId="button-close-transfer-form" text="X" type="button" handleClick={handleClose} />
          <Form
            testId="form-transfer"
            btnTestId="button-submit-transfer"
            btnText="Transferir"
            inputs={transferInputs}
            handleSubmit={handleSubmit}
          />
          {
            feedbackMessage && (<p className="sub">{feedbackMessage}</p>)
          }
        </div>
      </div>
    </section>

  );
}
