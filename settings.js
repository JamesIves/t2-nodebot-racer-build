'use strict';

let settings = {
  speed: 100,
 };

module.exports = {
    setSpeed : (value) => {
       settings.speed = value;
     },
    getSpeed : () => {
      return settings.speed;
    }
};
