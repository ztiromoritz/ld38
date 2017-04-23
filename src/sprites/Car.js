import { Garfunkel } from 'garfunkel';
const Segment = Garfunkel.Segment;
const Vect = Garfunkel.Vect;
import config from 'app/config';

const BREAK_DIST_MULTIPLIER = 10000;


const v1 = new Vect(0,0);
const v2 = new Vect(2,2);

export default class extends Phaser.Sprite {

    constructor({ game, x, y, street, positionOnStreet, directionOnStreet }) {
        super(game, x, y, 'sprites', 0 /*frame*/ );


        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.speed = config.maxSpeed;



        this.street = street;
        this.street.addCar(this);
        this.positionOnStreet = positionOnStreet; // Value 0.0 - 1.o
        this.directionOnStreet = directionOnStreet; // boolean


        this.animations.add('idle', [0, 1, 2], 10, true);
        this.animations.add('pop', [3, 4, 5, 6], 13, false);
        this.animations.getAnimation('pop').onComplete.add(()=>{
            this.street.removeCar(this);
            this.destroy();
        });
        this.animations.play('idle');

    }

    update() {
        const v = this.street.getPosition(this.positionOnStreet);
        this.x = v.x;
        this.y = v.y;

        this.move();


        //Check traffic light
        let slowDown = false;
        _.forEach(this.street.getTrafficLights(), (light) => {
            if (this.positionOnStreet < light.positionOnStreet) {
                //console.log("wass",this.getRelativeDistance(this.positionOnStreet, light.positionOnStreet ));
                if (light.isRed() && this.getRelativeDistance(this.positionOnStreet, light.positionOnStreet) < config.lightBreakDistance) {
                    slowDown = true;
                }
            }
        });

        //check car in fron
        const carInFront = this.street.getCarInFront(this);
        if (carInFront) {
            //console.log("assert", this.positionOnStreet , carInFront.positionOnStreet,);
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

        //Cleanup
        if (this.positionOnStreet > 1.0 || this.positionOnStreet < 0.0) {
            // TODO: optimisation, cars could be pooled
            this.street.removeCar(this);
            this.destroy();
        }

    }

    move() {
        const delta = (1 / this.street.getLength()) * this.speed;
        this.positionOnStreet += delta;
    }

    crash() {
        this.animations.play('pop');
    }

    distance(otherCar){
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





}
