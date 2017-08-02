'use strict';

// Import the interface to Tessel hardware
const 
  express = require('express'),
  app = express(),
  path = require('path'),
  port = 3000,
  server = app.listen(port),
  socketIO = require('socket.io').listen(server),
  five = require("johnny-five"),
  Tessel = require("tessel-io"),
  os = require('os'),
  address = os.networkInterfaces()['wlan0'][0].address,
  settings = require('./settings');

// Setup new J5 board 
const board = new five.Board({
  io: new Tessel()
})

// Express Routes 
app.use('/static', express.static(path.join(__dirname, 'public')))

// Direct users to /public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

// Initalize the board components
board.on("ready", () => {
  
  // Motor Setup
  const motorLeft = new five.Motor({
    pins: {
      pwm: 'A5',
      dir: 'A6'
    },
    invertPWM: true
  })

  const motorRight = new five.Motor({
    pins: {
      pwm: 'B5',
      dir: 'B6'
    },
    invertPWM: true
  });

  function turnLeft() {
    // Move the motors to the left
    let speed = settings.getSpeed();

    motorLeft.speed(speed);
    motorRight.speed(speed / 3);

    // Controller Debug
    console.log("Turning Left @ " + speed);
  }

  function turnRight() {
    // Move the motors to the right
    let speed = settings.getSpeed();

    motorLeft.speed(speed / 3);
    motorRight.speed(speed);

    // Controller Debug
    console.log("Turning Right @ " + speed);
  }

  function moveForward() {
    // Move the motors forward
    let speed = settings.getSpeed();

    motorLeft.reverse(speed);
    motorRight.forward(speed);

    // Controller Debug
    console.log("Moving Forward @ " + speed);
  }

  function moveBack() {
    // Moves the motors backwards
    let speed = settings.getSpeed();

    motorLeft.forward(speed);
    motorRight.reverse(speed);

    // Controller Debug
    console.log("Moving Backwards @ " + speed);
  }

  function stopMotors() {
    // Stops all motors
    motorLeft.stop();
    motorRight.stop();

    // Controller Debug
    console.log("Stopping All Motors");
  }

  // Control Sockets
  socketIO.on('connection', (socket) => {

    // Modifies the motor speed
    socket.on('changeSpeed', (speed) => {
      settings.setSpeed(speed);

      // Speed Debug
      console.log('Speed has been set to ' + settings.getSpeed());
    });

    socket.on('turnRight', turnRight);
    socket.on('turnLeft', turnLeft)
    socket.on('moveForward', moveForward)
    socket.on('moveBack', moveBack)
    socket.on('stopMotors', stopMotors)

  });

  // Log access address
  console.log('Robot interface available @ ' + address + ':' + port);

});