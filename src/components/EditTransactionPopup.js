import React, { useState, useEffect } from 'react';

const EditTransactionPopup = ({ transaction, onClose, onSave }) => {
  const [updatedTransaction, setUpdatedTransaction] = useState({ ...transaction });

  useEffect(() => {
    if (transaction && transaction.date) {
      const localDate = new Date(transaction.date);
      const localOffset = localDate.getTimezoneOffset() * 60000;
      const localDateString = new Date(localDate.getTime() - localOffset).toISOString().slice(0, 16);
      
      setUpdatedTransaction({
        ...transaction,
        date: localDateString,
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTransaction({ ...updatedTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (parseFloat(updatedTransaction.amount) <= 0) {
    //   alert("El monto debe ser mayor que 0.");
    //   return;
    // }

    // Convertir la fecha a UTC con zona horaria antes de enviar
    const updatedDate = new Date(updatedTransaction.date);
    const isoDateString = updatedDate.toISOString(); 
    updatedTransaction.date = isoDateString;

    onSave(transaction.id, updatedTransaction);
  };

  return (
    <div
      className={`modal fade ${transaction ? 'show' : ''}`}
      id="editTransactionModal"
      tabIndex="-1"
      aria-labelledby="editTransactionModalLabel"
      aria-hidden={transaction ? 'false' : 'true'} // Si no hay transacción, el modal se oculta
      style={{ display: transaction ? 'block' : 'none' }} // Controlamos la visibilidad del modal
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editTransactionModalLabel">
              Edit Transaction
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="customer" className="form-label">
                  Customer
                </label>
                <input
                  type="text"
                  name="customer"
                  value={updatedTransaction.customer}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={updatedTransaction.amount}
                  className="form-control"
                  onChange={handleChange}
                  required
                  onInput={(e) => {
                    if (e.target.value <= 0) {
                      e.target.setCustomValidity("The amount must be greater than 0");
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="merchant" className="form-label">
                  Merchant
                </label>
                <input
                  type="text"
                  name="merchant"
                  value={updatedTransaction.merchant}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={updatedTransaction.date}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionPopup;
