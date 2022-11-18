import React from 'react';

export interface TransferItemProps {
  id: number,
  debitedAccount: string,
  creditedAccount: string,
  value: number,
  createdAt: string,
}

export default function TransferItem({
  id, debitedAccount, creditedAccount, value, createdAt,
}: TransferItemProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{debitedAccount}</td>
      <td>{creditedAccount}</td>
      <td>{value}</td>
      <td>{createdAt}</td>
    </tr>

  );
}
