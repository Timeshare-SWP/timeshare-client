import React from 'react';
import './style.css';

const LoadingScreen = () => {
    return (
        <div
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                zIndex: 9999, 
            }}
        >
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
