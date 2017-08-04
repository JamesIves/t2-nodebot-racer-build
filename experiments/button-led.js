const 
  Tessel = require("tessel-io"),
  five = require("johnny-five");

const board = new five.Board({
  io: new Tessel()
});


board.on("ready", () => {
  const led = new five.Led("A5");
  const button = new five.Button("A2");

  button.on("press", () => { 
    led.on() 
  });

  button.on("release", () => { 
    led.off() 
  });
});