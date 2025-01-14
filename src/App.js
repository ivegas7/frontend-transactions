import React, { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AlertPopup from './components/AlertPopup';
import EditTransactionPopup from './components/EditTransactionPopup';

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './services/TransactionService';

// Ordenar las transacciones por ID de manera descendente
const sortTransactionsById = (transactions) =>
  transactions.sort((a, b) => b.id - a.id);

const App = () => {
  // Definición de los estados
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [popupMessage, setPopupMessage] = useState({ message: '', type: '' });
  const [editTransaction, setEditTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal

  // Obtener las transacciones
  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      const sortedTransactions = sortTransactionsById(response.data);
      setTransactions(sortedTransactions);
    } catch (error) {
      setPopupMessage({ message: 'Error fetching transactions', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  // Agregar una nueva transacción
  const handleAddTransaction = async (transaction) => {
    try {
      const response = await createTransaction(transaction);
      const updatedTransactions = [...transactions, response.data];
      setTransactions(sortTransactionsById(updatedTransactions));
      setPopupMessage({ message: 'Transaction added successfully', type: 'success' });
    } catch (error) {
      setPopupMessage({
        message: error.response?.data?.message || 'Error creating transaction',
        type: 'error',
      });
    }
  };
   // Actualizar una transacción existente
  const handleUpdateTransaction = async (id, updatedTransaction) => {
    try {
      await updateTransaction(id, updatedTransaction);
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
      );
      setTransactions(sortTransactionsById(updatedTransactions));
      setPopupMessage({ message: 'Transaction updated successfully', type: 'success' });
      setEditTransaction(null);
      setModalVisible(false); // Cierra el modal cuando se guarda
    } catch (error) {
      setPopupMessage({
        message: error.response?.data?.message || 'Error updating transaction',
        type: 'error',
      });
    }
  };
  // Eliminar una transacción
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(sortTransactionsById(updatedTransactions));
      setPopupMessage({ message: 'Transaction deleted successfully', type: 'success' });
    } catch (error) {
      setPopupMessage({
        message: error.response?.data?.message || 'Error deleting transaction',
        type: 'error',
      });
    }
  };

  const showModal = (transaction) => {
    setEditTransaction(transaction);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  // Cargar transacciones al iniciar
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <div className="row">
      <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center my-4" style={{ color: '#fff' }}>Transaction Manager</h1>
          <AlertPopup
            message={popupMessage.message}
            type={popupMessage.type}
            onClose={() => setPopupMessage({ message: '', type: '' })}
          />
          <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        <div className="col-md-3"></div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TransactionList
            transactions={transactions}
            onUpdateTransaction={(id) => {
              const transaction = transactions.find((t) => t.id === id);
              showModal(transaction);
            }}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}
        {modalVisible && (
          <EditTransactionPopup
            transaction={editTransaction}
            onClose={hideModal}
            onSave={handleUpdateTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default App;
