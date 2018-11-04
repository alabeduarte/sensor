import React from 'react';
import Sensors from './Sensors';

export default ({ sensors = [] }) => (
  <div className="main">
    <h1>Sensor App</h1>
    <Sensors sensors={sensors} />
  </div>
);
