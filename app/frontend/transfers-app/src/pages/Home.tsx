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
          <Button testId="button-show-transfer-modal" text="Transferir" type="button" />
          <Form
            btnTestId="button-submit-transfer"
            btnText="Transferir"
            handleSubmit={handleSubmit}
            inputs={transferInputs}
          />
        </section>

        <section>
          <h1>Suas transferências</h1>
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
                <th data-testid="th-id">id</th>
                <th data-testid="th-debited-acc">conta debitada</th>
                <th data-testid="th-credited-acc">conta creditada</th>
                <th data-testid="th-value">valor</th>
                <th data-testid="th-created-at">data</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>0</td>
                <td>currentUser</td>
                <td>creditedUser</td>
                <td>10.00</td>
                <td>20/09/2022</td>
              </tr>
              <tr>
                <td>1</td>
                <td>currentUser</td>
                <td>creditedUser</td>
                <td>25.00</td>
                <td>25/12/2022</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>

  );
}
