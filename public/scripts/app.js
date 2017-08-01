(function() {
    var state = document.readyState;

    // Make sure that the document can be interacted with
    if (state === 'interactive' || state === 'complete') {
   
        // Variables
        var left = document.getElementById('left');
        var right = document.getElementById('right');
        var forward = document.getElementById('forward');
        var reverse = document.getElementById('reverse');
        var speedRange = document.getElementById('speed-range');
        var horn = document.getElementById('horn');

        // Initiate the socket connection!
        var socket = io()

        // Adjusts the current speed of the robot
        speedRange.onchange = () => {
            var value = speedRange.value;

            socket.emit('changeSpeed', value);
        };

        // If touch controls are available use them, otherwise use mouse controls
        if ('ontouchstart' in window) {

            horn.addEventListener('touchstart', function() {
                socket.emit('startHorn');
            })

            horn.addEventListener('touchend', function () {
                socket.emit('stopHorn');
            })

            forward.addEventListener('touchstart', function () {
                socket.emit('moveForward');
            })

            forward.addEventListener('touchend', function () {
                socket.emit('stopMotors');
            })

            reverse.addEventListener('touchstart', function () {
                socket.emit('moveBack');
            })

            reverse.addEventListener('touchend', function () {
                socket.emit('stopMotors');
            })

            left.addEventListener('touchstart', function () {
                socket.emit('moveLeft');
            })

            left.addEventListener('touchend', function () {
                socket.emit('stopMotors');
            })

            right.addEventListener('touchstart', function () {
                socket.emit('moveRight');
            })

            right.addEventListener('touchend', function () {
                socket.emit('stopMotors');
            })

        } else {

            horn.addEventListener('mousedown', function() {
                socket.emit('startHorn');
            })

            horn.addEventListener('mouseup', function() {
                socket.emit('stopHorn');
            })

            forward.addEventListener('mousedown', function() {
                socket.emit('moveForward');
            })

            forward.addEventListener('mouseup', function() {
                socket.emit('stopMotors');
            })

            reverse.addEventListener('mousedown', function() {
                socket.emit('moveBack');
            })

            reverse.addEventListener('mouseup', function() {
                socket.emit('stopMotors');
            })

            left.addEventListener('mousedown', function() {
                socket.emit('turnLeft');
            })

            left.addEventListener('mouseup', function() {
                socket.emit('stopMotors');
            })

            right.addEventListener('mousedown', function() {
                socket.emit('turnRight');
            })

            right.addEventListener('mouseup', function() {
                socket.emit('stopMotors');
            })
        }
    }

    else setTimeout(arguments.callee, 100);

})();