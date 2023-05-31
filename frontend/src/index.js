import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor } from './redux/store';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.subscribe(()=>console.log(store.getState()))

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>
);

