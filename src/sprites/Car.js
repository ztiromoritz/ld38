import { Garfunkel } from 'garfunkel';
import _ from 'lodash';
const Segment = Garfunkel.Segment;
const Vect = Garfunkel.Vect;
import config from 'app/config';
import Color from 'app/utils/Color';

const BREAK_DIST_MULTIPLIER = 10000;
const v1 = new Vect(0, 0);
const v2 = new Vect(0, 0);

class Car extends Phaser.Sprite {

    constructor({ game, street, positionOnStreet, directionOnStreet, color, scoreboard }) {
        super(game, -100, -100, 'sprites', 0 /*frame*/ );

        this.color = color;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.speed = config.maxSpeed;
        this.doRotation = _.includes(Color.finalColors, color);

        this.street = street;
        this.scoreboard = scoreboard;

        this.positionOnStreet = positionOnStreet; // Value 0.0 - 1.o
        this.directionOnStreet = directionOnStreet; // boolean


        this.animations.add('pop', [24, 25, 26, 27], 13, false);
        this.animations.getAnimation('pop').onComplete.add(() => {
            this.street.removeCar(this);
            this.destroy();
        });
        this.addAnimations();
        this.animations.play(`idle_${this.color}`);

        this.street.addCar(this);

        const v = this.street.getPosition(this.positionOnStreet);
        this.x = v.x;
        this.y = v.y;

    }

    addAnimations() {
        Color.idleColors.forEach((c) => {
            this.animations.add(`idle_${c}`, _.map([0, 1, 2], i => i + c), 10, true);
        });
        Color.finalColors.forEach((c) => {
            this.animations.add(`idle_${c}`, [c], 10, true);
        });
    }

    update() {
        const v = this.street.getPosition(this.positionOnStreet);
        this.x = v.x;
        this.y = v.y;

        if (this.doRotation) {
            this.angle += 4;
        }

        this.move();


        //Check traffic light
        let slowDown = false;
        _.forEach(this.street.getTrafficLights(), (light) => {
            if (this.positionOnStreet < light.positionOnStreet) {

                if (light.isRed() && this.getRelativeDistance(this.positionOnStreet, light.positionOnStreet) < config.lightBreakDistance) {
                    slowDown = true;
                }
            }
        });

        //check car in fron
        const carInFront = this.street.getCarInFront(this);
        if (carInFront) {
            //console.log("carInFront", this.color, carInFront.color, this.getRelativeDistance(this.positionOnStreet, carInFront.positionOnStreet), config.carBreakDistance);

            if (this.getRelativeDistance(this.positionOnStreet, carInFront.positionOnStreet) < config.carBreakDistance) {

                slowDown = true;
            }

        }

        if (slowDown) {

            if (this.speed > 0) {


                this.speed = Math.max(0, this.speed - (config.slowdown * (1000 / this.street.getLength())));
            }
        } else {
            if (this.speed < config.maxSpeed) {
                this.speed = Math.min(this.speed + config.accelerate, config.maxSpeed);
            }
        }

        //Cleanup, Change Street
        if (this.positionOnStreet > 1.0) {
            const nextStreet = this.street.getNextStreet();
            if (nextStreet) {
                this.positionOnStreet = 0;
                this.street.removeCar(this);
                nextStreet.addCar(this);
                this.street = nextStreet;
            } else {
                // TODO: optimisation, cars could be pooled
                this.street.removeCar(this);
                this.destroy();
            }
        }

    }

    move() {
        const delta = (1 / this.street.getLength()) * this.speed;
        //console.log("move delta",delta, this.speed, this.color);

        this.positionOnStreet += delta;
    }

    crash() {
        this.animations.play('pop');
    }

    distance(otherCar) {
        v1.x = this.x;
        v1.y = this.y;
        v2.x = otherCar.x;
        v2.y = otherCar.y;
        return v1.distance(v2);
    }

    //positiv if pos1 < pos2
    getRelativeDistance(pos1, pos2) {
        return BREAK_DIST_MULTIPLIER * (pos2 - pos1) / this.street.getLength();
    }

    changeColor(color) {
        if (this.color != color) {
            this.color = color;
            this.animations.play(`idle_${this.color}`);
            if (_.includes(Color.finalColors, color)) {
                this.doRotation = true;
                this.scoreboard.increaseColor(color);
            }
        }
    }
}

export default Car;
