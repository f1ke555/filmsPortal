import React from 'react';

const Spinner = () => {
    const spinnerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    return (
        <div style={spinnerStyle}>
            <div className="spinner-border" role="status"></div>
        </div>
    );
};

export default Spinner;
