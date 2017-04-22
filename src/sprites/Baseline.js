import Phaser from 'phaser';
import config from 'app/config';

export default class extends Phaser.Graphics {

    constructor({ game, x, y }) {
        super(game, -config.gameWidth, y);
        this.lineStyle(5, 0xffbbff, 1);
        this.moveTo(0, config.baseLine);
        this.lineTo(config.gameWidth * 2, config.baseLine);

        this.beginFill(0xffccff, 1);
        this.drawCircle(config.laneA, config.baseLine, 60);
        this.drawCircle(config.laneB, config.baseLine, 60);
        this.drawCircle(config.laneC, config.baseLine, 60);
        this.drawCircle(config.laneD, config.baseLine, 60);

        this.game.add.tween(this).to({ x: x }, 900).start();

    }

    update() {

    }
}
