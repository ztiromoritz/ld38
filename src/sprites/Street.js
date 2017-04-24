import Phaser from 'phaser';
import config from 'app/config';

import { Garfunkel } from 'garfunkel';
const Segment = Garfunkel.Segment;
const Vect = Garfunkel.Vect;

//const color = 0xffaaee;
const alpha = 1.0;
export default class extends Phaser.Graphics {

    constructor({ game, x1, y1, x2, y2, trafficLights, color, streetMap , nextId}) {

        super(game, 0, 0);
        this.lineStyle(config.streetWidth, color, alpha);
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.lineStyle(1, color, 0.0);
        this.beginFill( color, alpha);
        this.drawCircle(x1,y1, config.streetWidth);
        this.drawCircle(x2,y2, config.streetWidth);


        this.streetMap = streetMap;
        this.nextId = nextId;

        this.segment = new Segment(new Vect(x1, y1), new Vect(x2, y2));
        this.length = this.segment.length();
        this.cars = [];

        this.trafficLights = trafficLights || [];

    }

    // returns vect
    getPosition(pos) {
        return this.segment.getPoint(pos);
    }

    getTrafficLightPosition(pos, distance) {
        const v = this.segment.getPoint(pos);
        const direction = this.segment.direction().turnRight().mul(distance);
        v.add(direction);
        return v;
    }

    getTrafficLights() {
        return this.trafficLights;
    }



    getRotation() {
        return this.segment.direction().angle() + (Math.PI / 2);
    }

    getLength() {
        return this.length;
    }

    addLight(light) {
        this.trafficLights.push(light);
    }

    addCar(car) {
        //Autos überholen sich nicht, also muss nur beim Einfügen sortiert werden.
        //FIXME: Das geht kaputt, wenn die Autos die Straße wechseln können

        this.cars.push(car);
        this.cars = _.orderBy(this.cars, ["positionOnStreet"], ['desc']);
    }

    removeCar(car) {
        _.pull(this.cars, car);
    }

    getNextStreet(){
        return this.streetMap[this.nextId];
    }


    // result can be null
    getCarInFront(car){
        const index = _.indexOf(this.cars,car);
        if(index - 1 >= 0){
            return this.cars[index - 1];
        }
        return null;
    }



    update() {

    }
}
