import config from 'app/config';
import Phaser from 'phaser';
export default class extends Phaser.Graphics {
    constructor({ game, x, y, r }) {
        super(game, 0, 0);
        this.lineStyle(4, 0xffffff, 1.0);
        this.beginFill(0xffffff, 1);
        this.drawCircle(x, y, r);
    }
}
