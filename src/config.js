const gameWidth = 1024;
const gameHeight = 1024;



const config = {
    //geometrics
    gameWidth,
    gameHeight,
    localStorageName: 'ld38',

    //car
    spawnRate: 1,
    spawnInterval: 1000,
    maxSpeed: 2,
    slowdown: 3,
    accelerate: 0.4,
    carBreakDistance: 2.7,
    lightBreakDistance: 0.5,
    collisionDistance: 20,
    switchDistance: 60,

    //streets
    streetWidth: 40,

    lightDistance: 0,

    streets: [{

            id: 'A',
            x1: gameWidth - 64,
            y1: 64,
            x2: gameWidth - 64,
            y2: gameHeight - 64,
            light: 0.43,
            lightId: 'L1',
            color: 0xffaabb,
            nextId: 'B'
        },
        {
            // <------
            id: 'B',
            x1: gameWidth - 64,
            y1: gameHeight - 64,
            x2: gameWidth / 2 + 20,
            y2: gameHeight - 64,
            light: 0.43,
            lightId: 'L2',
            color: 0xffaaff,
            nextId: 'D'
        },
        {
            // |
            // |
            // v
            id: 'C',
            x1: gameWidth / 4 - 20,
            y1: 0,
            x2: gameWidth / 3 - 20,
            y2: gameHeight,
            light: 0.43,
            lightId: 'L3',
            color: 0xffaaee,
            nextId: ''
        },
        {
            // A
            // |
            // |
            id: 'D',
            x1: gameWidth / 2 + 20,
            y1: gameHeight - 64,
            x2: gameWidth / 2 + 20,
            y2: 64,
            light: 0.43,
            lightId: 'L4',
            color: 0xffaa99,
            nextId: 'E'

        },
        {
            id: 'E',
            x1: gameWidth / 2 + 20,
            y1: 64,
            x2: gameWidth - 64,
            y2: 64,
            light: 0.43,
            lightId: 'L4',
            color: 0xffaa00,
            nextId: 'A'
        }

    ]
};
export default config;
