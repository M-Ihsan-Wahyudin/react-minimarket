import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';

// State Management
import store from './store/index';
import { Provider } from 'react-redux';

// Vendors
import "./assets/vendors/boxicons/css/boxicons.min.css"
import "./assets/css/xe.css"

// My Style
import "./assets/css/dashboard.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
