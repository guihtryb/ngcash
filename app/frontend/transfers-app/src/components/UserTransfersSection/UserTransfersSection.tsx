import React from 'react';
import { UserData } from '../../interfaces';
import getUserData from '../../utils/user';
import Input from '../Input';
import TransferItem, { TransferItemProps } from '../TransferItem';

import './index.css';

interface UserTransfersSectionProps {
  transfers: TransferItemProps[]
}

export default function UserTransfersSection({ transfers }: UserTransfersSectionProps) {
  const [transactionsFilter, setTransactionsFilter] = React.useState({
    filterByDate: '',
    filterByCashIn: false,
    filterByCashOut: false,
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setTransactionsFilter({ ...transactionsFilter, [target.name]: value });
  };

  const handleFilter = (data: TransferItemProps[]) => {
    const { user: { username } } = getUserData() as UserData;

    const filteredByDate = data.filter(
      (transferItem) => transferItem.createdAt.includes(transactionsFilter.filterByDate),
    );

    const filteredByCashIn = filteredByDate.filter(
      (transferItem) => transferItem.cashInAccount === username,
    );

    const filteredByCashOut = filteredByDate.filter(
      (transferItem) => transferItem.cashOutAccount === username,
    );

    if (transactionsFilter.filterByCashOut && transactionsFilter.filterByCashIn) {
      return filteredByDate
        .map((transferItem) => (
          <TransferItem
            key={transferItem.id}
            id={transferItem.id}
            cashInAccount={transferItem.cashInAccount}
            cashOutAccount={transferItem.cashOutAccount}
            value={transferItem.value}
            createdAt={transferItem.createdAt}
          />
        ));
    }

    if (transactionsFilter.filterByCashIn) {
      return filteredByCashIn
        .map((transferItem) => (
          <TransferItem
            key={transferItem.id}
            id={transferItem.id}
            cashInAccount={transferItem.cashInAccount}
            cashOutAccount={transferItem.cashOutAccount}
            value={transferItem.value}
            createdAt={transferItem.createdAt}
          />
        ));
    }

    if (transactionsFilter.filterByCashOut) {
      return filteredByCashOut
        .map((transferItem) => (
          <TransferItem
            key={transferItem.id}
            id={transferItem.id}
            cashInAccount={transferItem.cashInAccount}
            cashOutAccount={transferItem.cashOutAccount}
            value={transferItem.value}
            createdAt={transferItem.createdAt}
          />
        ));
    }

    return filteredByDate.map((transferItem) => (
      <TransferItem
        key={transferItem.id}
        id={transferItem.id}
        cashInAccount={transferItem.cashInAccount}
        cashOutAccount={transferItem.cashOutAccount}
        value={transferItem.value}
        createdAt={transferItem.createdAt}
      />
    ));
  };

  return (
    <section className="section transfers">
      <h1 className="title">Suas transferências</h1>
      <div className="filters">
        <Input
          id="input-transfers-filter-by-date"
          name="filterByDate"
          placeholder="20/09/2022"
          testId="input-transfers-filter-by-date"
          type="text"
          onChange={handleChange}
          value={transactionsFilter.filterByDate}
          labelText="Filtrar transferência por data"
        />
        <Input
          id="input-transfers-filter-by-cash-in"
          name="filterByCashIn"
          placeholder="20/09/2022"
          testId="input-transfers-filter-by-cash-in"
          type="checkbox"
          onChange={handleChange}
          checked={transactionsFilter.filterByCashIn}
          labelText="Cash In"
        />
        <Input
          id="input-transfers-filter-by-cash-out"
          name="filterByCashOut"
          placeholder="20/09/2022"
          testId="input-transfers-filter-by-cash-out"
          type="checkbox"
          onChange={handleChange}
          checked={transactionsFilter.filterByCashOut}
          labelText="Cash Out"
        />
      </div>
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
      { !transfers.length && (<p className="sub">Você ainda não possui transferências!</p>) }
    </section>
  );
}
