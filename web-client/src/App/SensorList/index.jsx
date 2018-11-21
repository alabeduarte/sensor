import React from 'react';
import './index.scss';

const statuses = {
  'TEMPERATURE_CHANGED': 'info',
  'TEMPERATURE_IN_RANGE_DETECTED': 'info',
  'TEMPERATURE_OUT_OF_RANGE_DETECTED': 'warning'
};

export default ({ sensors }) => (
  <ul className="sensors">
    {sensors.map((event, index) => (
      <li key={index} className={statuses[event.name]}>
        <div className="sensor">
          <div className="uuid column-large">
            {event.data.uuid}
          </div>
          <div className="event-name column-xlarge">
            {event.name}
          </div>
          <div className="current-temperature column-small">
            {event.data.currentTemperature}ºC
          </div>
          <div className="min-temperature column-small">
            min {event.data.idealTemperatureRange.min}ºC
          </div>
          <div className="max-temperature column-small">
            max {event.data.idealTemperatureRange.max}ºC
          </div>
        </div>
      </li>
    ))}
  </ul>
);
