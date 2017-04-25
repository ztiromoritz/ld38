/* globals __DEV__ */
import _ from 'lodash';
import Phaser from 'phaser';


import Dispatcher from 'app/events/Dispatcher';
import config from 'app/config';

import Car from 'app/sprites/Car';
import Color from 'app/utils/Color';
import Street from 'app/sprites/Street';
import Crossing from 'app/sprites/Crossing';
import TrafficLight from 'app/sprites/TrafficLight';
import Player from 'app/sprites/Player';
import Switch from 'app/sprites/Switch';
import Scoreboard from 'app/sprites/Scoreboard';

import { requestInterval, clearRequestInterval, getGIDs, getTileProperties } from 'app/utils';




export default class extends Phaser.State {
    init() {

    }
    preload() {}

    create() {
        const game = this.game;

        this.game.add.audio('whilee').loopFull();
        this.game.add.audio('knister').loopFull();



        this.player = new Player({ game, x: 660, y: 400 });

        // "Platformer"
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('tiles', 'tiles');
        this.wallsLayer = this.map.createLayer('walls');


        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.TILE_BIAS = 40;
        this.map.setCollision(getGIDs('solid', this.map), true, this.wallsLayer);




        const lightIdMap = Object.create({});
        // "CARS"
        this.streets = this.game.add.group();
        this.crossings = this.game.add.group();
        this.cars = this.game.add.group();
        this.overlayGroup = this.game.add.group();



        //Graphical Hack
        // Draw the map again with another tileset
        const overlayMap = this.game.add.tilemap('tilemap');
        overlayMap.addTilesetImage('tiles', 'extraLayerHack');
        overlayMap.createLayer('walls');




        this.lights = this.game.add.group();

        const streetMap = Object.create({});



        _.forEach(this.getStreetConfig(this.map), (s) => {
            let streetConfig = _.assign({}, { game: this.game, streetMap }, s);
            let street = new Street(streetConfig);
            streetMap[s.id] = street;
            this.streets.add(street);

        });

        _.forEach(this.getCrossingConfig(this.map), (c) => {
            let crossConfig = _.assign({}, { game: this.game }, c);
            let crossing = new Crossing(crossConfig);
            this.crossings.add(crossing);
        });


        //Global point store and handling and rendering ... :)
        const scoreboard = new Scoreboard({ game, x: 90, y: 90 , config : {
            og:12,gp:0,po:0
        }});

        this.game.add.existing(scoreboard);

        this.game.add.existing(this.player);
        this.switches = this.game.add.group();
        this.game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(() => {
            this.switches.forEach((sw) => {
                sw.tryToggle();
            });
        });


        //Connect Switches
        this.map.objects.marker.forEach((marker) => {
            var properties = getTileProperties(marker.gid, this.map);

            if (properties.type === 'switch') {
                //const light = lightIdMap[marker.properties.lightId];
                const lightId = marker.properties.lightId;
                const split = lightId.split(',');
                if (split && split.length == 2) {
                    const streetId = split[0];
                    const street = streetMap[streetId];
                    const positionOnStreet = split[1];
                    const light = new TrafficLight({ game, street, positionOnStreet });
                    street.addLight(light);
                    this.lights.add(light);
                    const sw = new Switch({
                        game,
                        x: marker.x,
                        y: marker.y,
                        trafficLight: light,
                        player: this.player,
                        flipX: !!properties.flipX
                    });
                    this.switches.add(sw);
                }
            }
        });


        //AddCars
        _(this.map.properties)
            .filter((value, key) => key.startsWith('car'))
            .map(c => c.split(','))
            .map(split => {

                const street = streetMap[split[0]];
                const positionOnStreet = Number.parseFloat(split[1]);
                const color = Color[split[2]];
                return new Car({ game, street, positionOnStreet, color , scoreboard});
            })
            .forEach(car => {
                this.cars.add(car);
            });



        /*
        // DEBUG single car
        const street =this.streets.getAt(3);
        const car = new Car({ game: this.game, x: 250, y: 200, street, positionOnStreet: 0.0 });
        this.cars.add(car);
        */

        //DEBUG: light
        /*
        this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(() => { this.lights.getAt(0).toggle() });
        this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(() => { this.lights.getAt(1).toggle() });
        this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(() => { this.lights.getAt(2).toggle() });
        this.game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(() => { this.lights.getAt(3).toggle() });
        */

    }


    getCrossingConfig(map) {
        const crossings = [];
        const pipes = this.map.objects.pipes;
        _.forEach(pipes, (pipe) => {
            if (pipe.ellipse) {
                crossings.push({
                    x: pipe.x + pipe.width / 2,
                    y: pipe.y + pipe.width / 2,
                    r: pipe.width
                });
            }
        });
        return crossings;
    }

    getStreetConfig(map) {
        console.log('map', map);
        const streets = [];
        const pipes = this.map.objects.pipes;
        _.forEach(pipes, (pipe) => {
            //One Pipe is a polyline;
            if (pipe.polyline) {
                let idPrefix = pipe.name;
                const offsetX = pipe.x;
                const offsetY = pipe.y;
                for (let i = 0; i < pipe.polyline.length; i++) {
                    const index = i;
                    const nextIndex = (i + 1) % pipe.polyline.length;
                    const p1 = pipe.polyline[index];
                    const p2 = pipe.polyline[nextIndex];
                    const street = {
                        id: `${idPrefix}_${index}`,
                        nextId: `${idPrefix}_${nextIndex}`,
                        x1: p1[0] + offsetX,
                        y1: p1[1] + offsetY,
                        x2: p2[0] + offsetX,
                        y2: p2[1] + offsetY,
                        color: Number.parseInt(pipe.properties.color || '0xff00ff'),
                        //light: 0.43,  //TODO
                        //lightId: 'L2' //TODO
                    };
                    streets.push(street);
                }
            }
        });
        return streets;

    }

    update() {

        this.physics.arcade.collide(this.player, this.wallsLayer);

        //Circle collision for cars
        this.cars.forEach((carA) => {
            this.cars.forEach((carB) => {
                if (carA != carB && carA.distance(carB) < config.collisionDistance) {
                    const color = Color.merge(carA.color, carB.color);
                    if (_.isNumber(color)) {
                        carA.changeColor(color);
                        carB.changeColor(color);
                        this.game.sound.play('plop');
                    } else {
                        //TODO: immortal flag
                    }
                }
            });
        });
    }

    keyHandler(key) {
        return () => {};
    }

    render() {
        if (__DEV__) {
            //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
            //this.game.debug.body(this.player)
        }
    }
}
