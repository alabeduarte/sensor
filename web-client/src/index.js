/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thermometerSensor from './api/thermometer-sensor';

ReactDOM.render(
  React.createElement(App, { api: thermometerSensor }),
  document.getElementById('root'),
);
