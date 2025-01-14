import React from 'react';

const AlertPopup = ({ message, type, onClose }) => {
  if (!message) return null; 

  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';

  return (
    <div className={`alert ${alertClass} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default AlertPopup;
