const 
  Tessel = require("tessel-io"),
  five = require("johnny-five");

const board = new five.Board({
  io: new Tessel()
});


board.on("ready", () => {
  const led = new five.Led("A0");
  led.blink(2500);
});