/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thermometerSensor from './api/thermometer-sensor';

thermometerSensor({ host: 'http://localhost:8080' })
  .then(res => res.json())
  .then((sensors) => {
    ReactDOM.render(React.createElement(App, { sensors }), document.getElementById('root'));
  });
