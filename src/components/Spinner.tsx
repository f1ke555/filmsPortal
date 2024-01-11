import React from 'react';

const Spinner = () => {
    const wrapperStyle = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
    };

    return (
        <div style={wrapperStyle} className="spinner-border d-flex  position-absolute" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );;
};

export default Spinner;