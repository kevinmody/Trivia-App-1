import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './index.css';

const store = createStore(Reducer);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

