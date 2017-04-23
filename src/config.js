const gameWidth = 1024;
const gameHeight = 1024;



const config = {
    //geometrics
    gameWidth,
    gameHeight,
    localStorageName: 'ld38',

    //car
    spawnRate : 1,
    maxSpeed: 3,
    slowdown: 0.5,
    accelerate: 0.1,
    carBreakDistance: 0.4,
    lightBreakDistance: 0.5,
    collisionDistance: 30,

    //streets
    streetWidth: 38,

    lightDistance: 38,

    streets: [{
            x1: 0,
            y1: gameHeight/2 + 20,
            x2: gameWidth,
            y2: gameHeight/2 + 20,
            light: 0.43
        },
        {
            x1: gameWidth,
            y1: gameHeight/2 - 20,
            x2: 0,
            y2: gameHeight/2 - 20,
            light: 0.43
        },
        {
            x1: gameWidth/2 - 20,
            y1: 0,
            x2: gameWidth/2 - 20,
            y2: gameHeight,
            light: 0.43
        },
        {
            x1: gameWidth/2 + 20,
            y1: gameHeight,
            x2: gameWidth/2 + 20,
            y2: 0,
            light: 0.43,

        }
    ]
};
export default config;
