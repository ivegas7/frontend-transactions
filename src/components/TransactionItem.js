import React from 'react';

const TransactionItem = ({ transaction, onUpdateTransaction, onDeleteTransaction }) => {
  return (
    <tr>
      <td>{transaction.id}</td>
      <td>{transaction.customer}</td>
      <td>${transaction.amount}</td>
      <td>{formatDate(transaction.date)}</td>
      <td >
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => onUpdateTransaction(transaction.id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDeleteTransaction(transaction.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Santiago',
    timeZoneName: 'short',
  });
};



export default TransactionItem;
