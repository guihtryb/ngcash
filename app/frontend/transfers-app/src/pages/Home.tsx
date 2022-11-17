import React from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import { InputOnChange } from '../types';

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

export default function Home() {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => target;

  return (
    <div>
      <header>
        <span>
          Transfers App
        </span>
        <span data-testid="user-username-info">
          Olá, username!
        </span>
        <span data-testid="user-balance-info">
          Balance
        </span>
        <Button testId="button-log-out" text="Sair" handleClick={() => null} type="button" />
      </header>

      <main>
        <section>
          <h1>Realize transferências Instantaneamente!</h1>
          <Button testId="button-show-transfer-form" text="Transferir" type="button" />
          <Form
            testId="form-transfer"
            btnTestId="button-submit-transfer"
            btnText="Transferir"
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
            onChange={handleChange}
            value=""
            labelText="Filtrar transferência por data"
          />
          <table data-testid="table-transfers">
            <thead>
              <tr>
                <th data-testid="th-id">id</th>
                <th data-testid="th-debited-acc">conta debitada</th>
                <th data-testid="th-credited-acc">conta creditada</th>
                <th data-testid="th-value">valor</th>
                <th data-testid="th-created-at">data</th>
              </tr>
            </thead>

            <tbody data-testid="transfers">
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
