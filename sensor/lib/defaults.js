
var sensor_0_gpio = 22,
    sensor_1_gpio = 27,
    sensor_2_gpio = 17;

var states = [
  {
    id: sensor_0_gpio,
    color: "orange",
    count: 0,
    millis: 0,
    pouring: false,
    lastPourState: false,
    lastPourChange: Date.now(),
    pourStart: 0,
    pourChange: lastPourChange,
    pourDelta: 0,
    hertz: 0,
    flow: 0,
    litersPoured: 0,
    pintsPoured:0
  },
  {
    id: sensor_1_gpio,
    color: "green",
    count: 0,
    millis: 0,
    pouring: false,
    lastPourState: false,
    lastPourChange: Date.now(),
    pourStart: 0,
    pourChange: lastPourChange,
    pourDelta: 0,
    hertz: 0,
    flow: 0,
    litersPoured: 0,
    pintsPoured:0   
  },
  {
    id: sensor_2_gpio,
    color: "yellow",
    count: 0,
    millis: 0,
    pouring: false,
    lastPourState: false,
    lastPourChange: Date.now(),
    pourStart: 0,
    pourChange: lastPourChange,
    pourDelta: 0,
    hertz: 0,
    flow: 0,
    litersPoured: 0,
    pintsPoured:0
  }
];

var payload = {
    "dcssip": "localhost",
    "dcsuri": "/dalek/state",
    "WT.ti":  "Dalek State",
    "WT.co_f": "dalek-state"
};

module.exports = {
  check_period: 500,
  states: states,
  mock_flow: false,
  mock_count: 27,
  payload: payload
}