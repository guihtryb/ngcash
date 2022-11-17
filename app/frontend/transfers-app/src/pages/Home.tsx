import React from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';

const transferInputs = [
  {
    labelText: 'Transferir para',
    type: 'text',
    name: 'input-transfer-username',
    id: 'input-transfer-username',
    placeholder: 'username',
    testId: 'input-transfer-username',
  },
  {
    labelText: 'Valor',
    type: 'text',
    name: 'input-transfer-value',
    id: 'input-transfer-value',
    placeholder: 'password',
    testId: 'input-transfer-value',
  },
];

export default function Home() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <header>
        <span>
          Transfers App
        </span>
        <span>
          Olá, username!
        </span>
        <span>
          Balance
        </span>
        <Button testId="button-log-out" text="Sair" handleClick={() => null} type="button" />
      </header>
      <main>
        <section>
          <h1>Realize transferências Instantaneamente!</h1>
          <Form
            btnTestId="button-submit-transfer"
            btnText="Transferir"
            handleSubmit={handleSubmit}
            inputs={transferInputs}
          />
        </section>

        <Input
          id="input-transfers-filter"
          name="input-transfers-filter"
          placeholder="20/09/2022"
          testId="input-transfers-filter"
          type="text"
          labelText="Filtrar transferência por data"
        />

        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>debitedAccount</th>
              <th>creditedAccount</th>
              <th>value</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>currentUser</td>
              <td>creditedUser</td>
              <td>10.00</td>
              <td>dd/mm/yyyy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>currentUser</td>
              <td>creditedUser</td>
              <td>25.00</td>
              <td>dd/mm/yyyy</td>
            </tr>
          </tbody>
        </table>

      </main>
    </div>

  );
}
