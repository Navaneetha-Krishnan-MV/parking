import React from 'react';
import ReactDOM from 'react-dom/client';
import './Resources/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const initialOptions = {
    clientId: 'AX1IMaASl7mBe1PncBUj0eL5Y-Xxam_veonaC-WauRp86YAdAryW9X6G6Q2K_L_20PyhH3lH_iYkAPpx',
    currency: 'INR',
};

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot for React 18+
root.render(
    <PayPalScriptProvider options={initialOptions}>
        <App />
    </PayPalScriptProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
