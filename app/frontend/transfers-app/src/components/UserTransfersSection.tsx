import React from 'react';
import Input from './Input';

export default function UserTransfersSection() {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => target;

  return (
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
  );
}
