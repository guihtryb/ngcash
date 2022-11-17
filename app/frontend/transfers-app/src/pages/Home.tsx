import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';
import Header from '../components/Header';
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
  const [usernameText, setUsernameText] = React.useState('');
  const [userBalance, setUserBalance] = React.useState(0.0);

  const getUserUsername = async () => setUsernameText('Guih');
  const getUserBalance = async () => setUserBalance(0.0);

  React.useEffect(() => {
    getUserUsername();
    getUserBalance();
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => target;

  const handleSubmit = (e: React.FormEvent, formsData: {[field: string]: string}) => {
    e.preventDefault();
  };

  return (
    <div>
      <Header usernameText={usernameText} userBalance={userBalance} />

      <main>
        <section>
          <h1>Realize transferências Instantaneamente!</h1>
          <Button testId="button-show-transfer-form" text="Transferir" type="button" />
          <Form
            testId="form-transfer"
            btnTestId="button-submit-transfer"
            btnText="Transferir"
            inputs={transferInputs}
            handleSubmit={handleSubmit}
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
