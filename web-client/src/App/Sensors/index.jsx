import React from 'react';

export default ({ sensors }) => (
  <ul className="sensors">
    {sensors.map(sensor => (
      <li key={sensor.data.uuid}>
        <span>Current Temperature: {sensor.data.currentTemperature}</span>
        <span>ºC</span>
      </li>
    ))}
  </ul>
);
