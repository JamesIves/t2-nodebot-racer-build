var settings = {
  speed: 100,
 };

module.exports = {
    setSpeed : function(value) {
       settings.speed = value;
     },
    getSpeed : function(){
      return settings.speed;
    }
};