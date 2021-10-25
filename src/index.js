import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StarRatingProvider } from './context/starRatingContext';

ReactDOM.render(
  <React.StrictMode>
  <StarRatingProvider>
    <App />
    </StarRatingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
