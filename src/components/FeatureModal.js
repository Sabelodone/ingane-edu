import React from 'react';
import './FeatureModal.css';

const FeatureModal = ({ isOpen, onClose, feature }) => {
  if (!isOpen) return null; // Do not render modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
      </div>
    </div>
  );
};

export default FeatureModal;
