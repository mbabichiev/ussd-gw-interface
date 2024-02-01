import React from 'react';

const ErrorText = ({ text }) => {
    return (
        <div style={{ color: "red" }}>
            <svg className="me-2" width="1.3em" height="1.3em" fill="red">
                <use href="#warning"></use>
            </svg>
            {text}
        </div>
    );
};

export default ErrorText;