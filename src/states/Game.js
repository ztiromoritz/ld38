/* globals __DEV__ */
import _ from 'lodash';
import Phaser from 'phaser';


import Dispatcher from 'app/events/Dispatcher';
import config from 'app/config';

import Car from 'app/sprites/Car';
import Street from 'app/sprites/Street';
import TrafficLight from 'app/sprites/TrafficLight';
import Player from 'app/sprites/Player';

import { requestInterval, clearRequestInterval, getGIDs } from 'app/utils';




export default class extends Phaser.State {
    init() {
        console.log('init state Game');
    }
    preload() {}

    create() {

        // "Platformer"
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('tiles', 'tiles');
        this.wallsLayer = this.map.createLayer('walls');


        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.TILE_BIAS = 40;
        this.map.setCollision(getGIDs('solid', this.map), true, this.wallsLayer);

        //console.log(getGIDs('solid', this.map));


        this.player = new Player({game: this.game, x:100, y: 100});

        this.game.add.existing(this.player);



        // "CARS"
        this.streets = this.game.add.group();
        this.cars = this.game.add.group();
        this.lights = this.game.add.group();

        _.forEach(config.streets, (s) => {
            let config = _.assign({}, { game: this.game }, s);
            let street = new Street(config);
            this.streets.add(street);
            const light = new TrafficLight({ game: this.game, street, positionOnStreet: s.light });
            street.addLight(light);
            this.lights.add(light);
        });

        //SPAWN
        const handle = requestInterval(() => {
            if (Math.random() < config.spawnRate) {
                const street = this.streets.getRandom();
                //const street =this.streets.getAt(3); // DEBUG single street
                const car = new Car({ game: this.game, x: 250, y: 200, street, positionOnStreet: 0.0 });
                this.cars.add(car);
            }
        }, 300);




        /*
        // DEBUG single car
        const street =this.streets.getAt(3);
        const car = new Car({ game: this.game, x: 250, y: 200, street, positionOnStreet: 0.0 });
        this.cars.add(car);
        */

        //DEBUG: light
        this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(() => { this.lights.getAt(0).toggle() });
        this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(() => { this.lights.getAt(1).toggle() });
        this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(() => { this.lights.getAt(2).toggle() });
        this.game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(() => { this.lights.getAt(3).toggle() });

    }

    update() {

        this.physics.arcade.collide(this.player, this.wallsLayer);

        //Circle collision for cars
        this.cars.forEach((carA) => {
            this.cars.forEach((carB) => {
                //console.log("dist",carA.distance(carB));
                if (carA != carB && carA.distance(carB) < config.collisionDistance) {
                    console.log('BAANG');
                    carA.crash();
                    carB.crash();
                }
            });
        });
    }

    keyHandler(key) {
        return () => {};
    }

    render() {



        if (__DEV__) {


            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
            this.game.debug.body(this.player);



        }
    }
}
