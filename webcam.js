// JS:

let noMovement = [
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255
    ]
]

let scale = config.johnDar.scale;

let noMovementTimer = 0;
let movementTimer = 0;
let away = false;
let awaySwitch = false;

document.getElementById("away").addEventListener("click", awayButton);

function awayButton() {
    if (awaySwitch) {
        awaySwitch = false;
    } else {
        awaySwitch = true;
    }
}

var diffy = Diffy.create({
    resolution: { x: 15, y: 10 },
    sensitivity: config.johnDar.sensitivity,
    threshold: config.johnDar.threshold,
    debug: config.johnDar.debug,
    containerClassName: 'my-diffy-container',
    sourceDimensions: config.johnDar.sourceDimensions,
    onFrame: function (matrix) {

        if (awaySwitch) {


            if (JSON.stringify(matrix) == JSON.stringify(noMovement)) {
                // No Movement
                noMovementTimer++;
                if (noMovementTimer > 100 * scale) {
                    movementTimer = 0;
                }

            } else {
                // Movement
                movementTimer++;

                if (movementTimer > 10 * scale) {
                    movementTimer = 0;
                    noMovementTimer = 0;
                    if (away) {
                        movementTimer = 0;
                        // console.log('John is back')
                        onRender.returnMessage();
                        away = false;
                    }
                }
            }

            if (noMovementTimer > 100 * scale) {
                noMovementTimer = 0;
                // console.log('No one is moving')
                onRender.awayMessage();
                away = true;
            }
        }
    }
});

