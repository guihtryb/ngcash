/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserTransfersSection from '../components/UserTransfersSection/UserTransfersSection';
import Home, { transfersMock } from '../pages/Home';

describe('Home page', () => {
  it('has a header with the user balance and username infos and a logout button', () => {
    const screen = render(<Home />, { wrapper: MemoryRouter });

    const username = screen.getByTestId('user-username-info');
    const title = screen.getByTestId('user-balance-info');
    const logOutBtn = screen.getByTestId('button-log-out');

    expect(username).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(logOutBtn).toBeInTheDocument();
  });
  it('has a section with a transfer form, that is visible when clicking to make a new transfer', () => {
    const screen = render(<Home />, { wrapper: MemoryRouter });

    const newTransferBtn = screen.getByTestId('button-show-transfer-form');
    const formTransfer = screen.getByTestId('form-transfer');

    expect(formTransfer).not.toBeVisible();

    fireEvent.click(newTransferBtn);

    expect(formTransfer).toBeVisible();
  });

  it('has a section with the user transfers in a table', () => {
    const screen = render(<Home />, { wrapper: MemoryRouter });

    const inputTransfersFilter = screen.getByTestId('input-transfers-filter');
    const tableTransfers = screen.getByTestId('table-transfers');

    expect(tableTransfers).toBeInTheDocument();
    expect(inputTransfersFilter).toBeInTheDocument();

    expect(screen.getByTestId('th-id')).toHaveTextContent('id');
    expect(screen.getByTestId('th-debited-acc')).toHaveTextContent('conta debitada');
    expect(screen.getByTestId('th-credited-acc')).toHaveTextContent('conta creditada');
    expect(screen.getByTestId('th-value')).toHaveTextContent('valor');
    expect(screen.getByTestId('th-created-at')).toHaveTextContent('data');
  });

  it('filter transfers by date succesfully', () => {
    const screen = render(
      <UserTransfersSection transfers={transfersMock} />,
      { wrapper: MemoryRouter },
    );

    const inputTransfersFilter = screen.getByTestId('input-transfers-filter');
    const transfers = screen.getByTestId('transfers');

    expect(transfers.children).toHaveLength(2);

    fireEvent.change(inputTransfersFilter, { target: { value: '20/09/2022' } });

    expect(transfers.children).toHaveLength(1);
  });
});
