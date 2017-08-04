const 
  Tessel = require("tessel-io"),
  five = require("johnny-five");

const board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  const rotary = new five.Sensor("A7");

  rotary.on("change", () => {
    console.log("Sensor changed!", this.value);
  });
});