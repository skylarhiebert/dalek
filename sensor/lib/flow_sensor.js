var defaults = require('./defaults'),
    _ = require('lodash');

var states = defaults.states;

if( defaults.mock_flow ){
  function pouring_mock(c){
    count = [c,c*.75,c*.125];
    states[0].pouring = false;
    states[0].count = c;
    states[1].pouring = false;
    states[1].count = c*0.75;
    states[2].pouring = false;
    states[2].count = c*1.25;
    setTimeout(pouring_mock, defaults.check_period, defaults.mock_count);
  }
  setTimeout(pouring_mock, defaults.check_period, defaults.mock_count);
} else {
  var Gpio = require('onoff').Gpio,
      sensor0 = new Gpio(states[0].id, 'in', 'both'),
      sensor1 = new Gpio(states[1].id, 'in', 'both'),
      sensor2 = new Gpio(states[2].id, 'in', 'both');

  function pouring_check(c,id){
    if(c != states[id].count) { // Pin State change to Pouring
        if(!states[id].pouring) {
            // Old State was not pouring
            states[id].pourStart = Date.now();
        }
        states[id].pouring = true;
        states[id].pourChange = Date.now();
        states[id].pourDelta = states[id].pourChange - states[id].lastPourChange;
        if(states[id].pourDelta < 1000) {
            states[id].hertz = 1000.0 / states[id].pourDelta
            states[id].flow = states[id].hertz / (60 * 7.5) // Liters/second
            states[id].litersPoured += flow  * (states[id].pourDelta / 1000.0)
            states[id].pintsPourds = states[id].litersPoured * 2.11338
        }
    }
  }

  function calculate_hertz(c, id) {
    if(states[id].pouring && )
  }
  
  sensor0.watch(function(err, value) {
    if (err) exit();
    if( value ){
      states[0].count++;
      setTimeout(pouring_check,defaults.check_period,states[0].count,0);
    }
  });  
  
  sensor1.watch(function(err, value) {
    if (err) exit();
    if( value ){
      states[1].count++;
      setTimeout(pouring_check,defaults.check_period,states[1].count,1);
    }
  });  

  sensor2.watch(function(err, value) {
    if (err) exit();
    if( value ){
      states[2].count++;
      setTimeout(pouring_check,defaults.check_period,states[2].count,2);
    }
  });  

  process.on('SIGINT', exit);
}

function exit() {
    process.exit();
}

function milliliters(count) {
  return count * 2.25;
}

function init(s){
  if( !_.isEmpty(s) ){
    states = s;
  }
  states.forEach( function(state){
    state.count = 0;
  });
}

function check(data, callback){

  states.forEach( function(state){
    if( !state.pouring ) {
      state.millis += milliliters(state.count);
      state.count = 0;
    }
  });
  callback(states);
}

module.exports = {
  check: check,
  init: init
};


