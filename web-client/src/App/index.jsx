import React, { PureComponent } from 'react';
import SensorList from './SensorList';
import SensorChart from './SensorChart';

const THERMOMETER_SENSOR_URL = 'http://localhost:8080';
const NOTIFICATION_URL = 'http://localhost:9090/sub/sensor';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sensors: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ data }) {
    this.setState(previousState => ({
      sensors: [JSON.parse(data), ...previousState.sensors]
    }));
  }

  componentDidMount() {
    this.props.httpClient({ host: 'http://localhost:8080' })
      .get('/thermometer-sensor')
      .then(sensors => {
        this.setState({ sensors });
      });

    const notification = new this.props.EventSource(NOTIFICATION_URL);
    notification.addEventListener('message', this.handleChange);
  }

  render() {
    return (
      <div className="main">
        <h1>Sensor App</h1>
        <SensorChart sensors={this.state.sensors} />
      </div>
    );
  }
}
