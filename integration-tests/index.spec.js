const { post } = require("./http-client");
const { CREATED } = require("http-status-codes");
const Subscription = require("./subscription");

describe("Pragma-Brewery", () => {
  const subscription = new Subscription({ subUrl: "http://notification/sub" });
  const sensorUrl = "http://thermometer-sensor:8080/thermometer-sensor";

  const channel = "pragma-brewery";
  let connection;

  beforeEach(() => {
    connection = subscription.subscribe(channel);
  });

  afterEach(subscription.unsubscribeAll);

  it("receives realtime data when temperature is out of range", done => {
    const message = {
      currentTemperature: 3,
      idealTemperatureRange: {
        min: 4,
        max: 6
      }
    };

    connection.onmessage = ({ data }) => {
      expect(data).toEqual(
        JSON.stringify({
          name: "TEMPERATURE_OUT_OF_RANGE_DETECTED",
          data: message
        })
      );
      done();
    };

    post(sensorUrl, { json: message })
      .then(({ statusCode }) => {
        expect(statusCode).toEqual(CREATED);
      })
      .catch(done);
  });
});
