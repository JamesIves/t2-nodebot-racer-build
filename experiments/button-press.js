const 
  Tessel = require("tessel-io"),
  five = require("johnny-five");

const board = new five.Board({
  io: new Tessel()
});


board.on("ready", () => {
  const button = new five.Button("A2");

  button.on("press", () => { 
    console.log("Button Pressed!")
  });

  button.on("release", () => { 
    console.log("Button Released!")
  });
});