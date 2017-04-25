import { Garfunkel } from 'garfunkel';
const Vect = Garfunkel.Vect;

import config from 'app/config';

const v1 = new Vect(0, 0);
const v2 = new Vect(0, 0);

export default class extends Phaser.Sprite {

    constructor({ game, x, y, trafficLight, player, flipX }) {
        super(game, x, y, 'sprites', 0 /*frame*/ );
        this.trafficLight = trafficLight;
        this.player = player;
        this.anchor.y = 1;
        this.anchor.x = 0;
        this.flipX = flipX;





    }

    update() {
        if (this.trafficLight && this.trafficLight.isRed()) {
            this.frame = (this.flipX)?55:46;
        } else {
            this.frame = (this.flipX)?54:47;
        }
    }



    tryToggle() {
        if (this.trafficLight) {
            v1.x = this.x;
            v1.y = this.y;
            v2.x = this.player.x;
            v2.y = this.player.y;

            if (v1.distance(v2) < config.switchDistance) {
                this.game.sound.play('schalter');
                this.trafficLight.toggle();
            }
        }
    }

}
