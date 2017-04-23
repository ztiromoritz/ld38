import { Garfunkel } from 'garfunkel';
const Segment = Garfunkel.Segment;

import config from 'app/config';
export default class extends Phaser.Sprite {

    constructor({ game, x, y,  street, positionOnStreet }) {
        super(game, -100, -100, 'sprites', 8 /*frame*/ );
        const v = street.getTrafficLightPosition(positionOnStreet, config.lightDistance);
        this.x = v.x;
        this.y = v.y;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.rotation = street.getRotation();

        this.red = true;
        this.street = street;

        this.positionOnStreet = positionOnStreet; // Value 0.0 - 1.0

    }

    update() {
        if (this.red) {
            this.frame = 8;
        } else {
            this.frame = 9;
        }
    }

    isRed() {
        return this.red;
    }

    setRed() {
        this.red = true;
    }

    setGreen() {
        this.red = false;
    }

    toggle() {
        this.red = !this.red;
    }
}
