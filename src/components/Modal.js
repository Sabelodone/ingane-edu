// Modal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Odal.css';

const InfoModal = ({ isOpen, onRequestClose, title, content }) => {
    return (
        <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden={!isOpen}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitle">{title}</h5>
                        <button type="button" className="close" onClick={onRequestClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{content}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
