(function() {
    const state = document.readyState;

    // Make sure that the document can be interacted with.
    if (state === 'interactive' || state === 'complete') {
   
        // Variables
        const 
            left = document.getElementById('left'),
            right = document.getElementById('right'),
            forward = document.getElementById('forward'),
            reverse = document.getElementById('reverse'),
            speedRange = document.getElementById('speed-range'),
            socket = io()

        // Adjusts the current speed of the robot.
        speedRange.onchange = () => {
            let value = speedRange.value;

            socket.emit('changeSpeed', value);
        };

        // If touch controls are available use them, otherwise use mouse controls.
        if ('ontouchstart' in window) {
            forward.addEventListener('touchstart', () => {
                socket.emit('moveForward');
            })

            forward.addEventListener('touchend', () => {
                socket.emit('stopMotors');
            })

            reverse.addEventListener('touchstart', () => {
                socket.emit('moveBack');
            })

            reverse.addEventListener('touchend', () => {
                socket.emit('stopMotors');
            })

            left.addEventListener('touchstart', () => {
                socket.emit('turnLeft');
            })

            left.addEventListener('touchend', () => {
                socket.emit('stopMotors');
            })

            right.addEventListener('touchstart', () => {
                socket.emit('turnRight');
            })

            right.addEventListener('touchend', () => {
                socket.emit('stopMotors');
            })

        } else {
            forward.addEventListener('mousedown', () => {
                socket.emit('moveForward');
            })

            forward.addEventListener('mouseup', () => {
                socket.emit('stopMotors');
            })

            reverse.addEventListener('mousedown', () => {
                socket.emit('moveBack');
            })

            reverse.addEventListener('mouseup', () => {
                socket.emit('stopMotors');
            })

            left.addEventListener('mousedown', () => {
                socket.emit('turnLeft');
            })

            left.addEventListener('mouseup', () => {
                socket.emit('stopMotors');
            })

            right.addEventListener('mousedown', () => {
                socket.emit('turnRight');
            })

            right.addEventListener('mouseup', () => {
                socket.emit('stopMotors');
            })
        }
    }

    else setTimeout(arguments.callee, 100);

})();