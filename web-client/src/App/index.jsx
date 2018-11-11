import React, { PureComponent } from 'react';
import SensorList from './SensorList';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sensors: []
    };
  }

  componentDidMount() {
    this.props.httpClient({ host: 'http://localhost:8080' })
      .get('/thermometer-sensor')
      .then(sensors => this.setState({ sensors }));
  }

  render() {
    return (
      <div className="main">
        <h1>Sensor App</h1>
        <SensorList sensors={this.state.sensors} />
      </div>
    );
  }
}
