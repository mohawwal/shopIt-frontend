import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux'
import store from './store'
import { AlertProvider } from './components/alert/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AlertProvider>
        <Provider store={store} >
            <App />
        </Provider>
    </AlertProvider>
);

