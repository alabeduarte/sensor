import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import sensorsGroupedByUUID from './sensors-grouped-by-uuid';
import chartData from './chart-data';

ReactChartkick.addAdapter(Chart);

export default ({ sensors }) => (
  <LineChart
    curve={false}
    data={chartData(sensorsGroupedByUUID(sensors))}
  />
);
