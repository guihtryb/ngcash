import React from 'react';
import Input from './Input';
import TransferItem, { TransferItemProps } from './TransferItem';

interface UserTransfersSectionProps {
  transfers: TransferItemProps[]
}

export default function UserTransfersSection({ transfers }: UserTransfersSectionProps) {
  const [filterByDate, setFilterByDate] = React.useState('');

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByDate(target.value);
  };

  const handleFilter = (data: TransferItemProps[]) => {
    if (filterByDate) {
      return data
        .map((transferItem) => transferItem.createdAt.includes(filterByDate) && (
          <TransferItem
            key={transferItem.id}
            id={transferItem.id}
            creditedAccount={transferItem.creditedAccount}
            debitedAccount={transferItem.debitedAccount}
            value={transferItem.value}
            createdAt={transferItem.createdAt}
          />
        ));
    }

    return data.map((transferItem) => transferItem.createdAt.includes(filterByDate) && (
      <TransferItem
        key={transferItem.id}
        id={transferItem.id}
        creditedAccount={transferItem.creditedAccount}
        debitedAccount={transferItem.debitedAccount}
        value={transferItem.value}
        createdAt={transferItem.createdAt}
      />
    ));
  };

  return (
    <section className="section">
      <h1>Suas transferências</h1>
      <Input
        id="input-transfers-filter"
        name="input-transfers-filter"
        placeholder="20/09/2022"
        testId="input-transfers-filter"
        type="text"
        onChange={handleChange}
        value={filterByDate}
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
          { transfers.length ? handleFilter(transfers) : null }
        </tbody>
      </table>
      { !transfers.length && (<p>Você ainda não possui transferências!</p>) }
    </section>
  );
}
