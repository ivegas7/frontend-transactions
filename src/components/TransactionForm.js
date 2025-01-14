import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  // Definir estados
  const [transaction, setTransaction] = useState({ customer: '', amount: '', merchant: '', date: '' });
  const [amountError, setAmountError] = useState('');

  //Manejar el cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      // Validar si el monto sea positivo
      if (value <= 0) {
        setAmountError('Amount must be positive');
      } else {
        setAmountError('');
      }
    }
    // Actualiza el estado del formulario
    setTransaction({ ...transaction, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amountError) {
      console.log('Error: ', amountError);
      return;
    }

   // Prepara los datos del formulario
    const updatedTransaction = {
      ...transaction,
      customer: transaction.customer.trim(),
      amount: transaction.amount.trim(),
      merchant: transaction.merchant.trim(),
      date: new Date(transaction.date).toISOString(),
    };

    try {
      //Agregar la transacción
      await onAddTransaction(updatedTransaction);
      setTransaction({ customer: '', amount: '', merchant: '', date: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };
  // Renderiza el formulario
  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="customer"
          value={transaction.customer}
          className="form-control"
          placeholder="Transaction Name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="number"
          name="amount"
          value={transaction.amount}
          className={`form-control ${amountError ? 'is-invalid' : ''}`}
          placeholder="Amount"
          onChange={handleChange}
          required
          min="0"
          step="1"
        />
        {amountError && <div className="invalid-feedback">{amountError}</div>}
      </div>

      <div className="mb-3">
        <input
          type="text"
          name="merchant"
          value={transaction.merchant}
          className="form-control"
          placeholder="Merchant"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="datetime-local"
          name="date"
          value={transaction.date}
          className="form-control"
          placeholder="Date"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
