import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }}
        >
            <CircularProgress size={50} />
        </div>
    );
};


export default Loading;

