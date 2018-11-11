/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import httpClient from './http-client';

ReactDOM.render(
  React.createElement(App, { httpClient, EventSource }),
  document.getElementById('root'),
);
