import React from 'react';

export interface TransferItemProps {
  cashInAccount: string,
  cashOutAccount: string,
  createdAt: string,
  id: number,
  value: number,
}

export default function TransferItem({
  id, cashOutAccount, cashInAccount, value, createdAt,
}: TransferItemProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{cashOutAccount}</td>
      <td>{cashInAccount}</td>
      <td>{value}</td>
      <td>{createdAt}</td>
    </tr>

  );
}
