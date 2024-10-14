// src/components/Screen.js

import React from 'react';
import './Screen.css';

const Screen = ({ screenInfo, onClose }) => {
    return (
        <div className="screen-overlay">
            <div className="screen-content">
                <h2 className="screen-title">Screen Information</h2>
                <pre className="screen-info">{screenInfo}</pre>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default Screen;
