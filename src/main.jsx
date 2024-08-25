import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/index';
import './global-styles/index.css';
import './global-styles/reset.css';
import './global-styles/theme.css';
import './global-styles/buttonTheme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
);
