import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onUpdateTransaction, onDeleteTransaction }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onUpdateTransaction={onUpdateTransaction}
            onDeleteTransaction={onDeleteTransaction}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
