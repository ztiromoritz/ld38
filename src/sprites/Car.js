export default class extends Phaser.Sprite {

    constructor({ game, x, y, asset }) {
        super(game, x, y, 'spritesheet', 0/*frame*/);
        this.anchor.y = 1.0;

        //this.animations.add('idle', [0, 1, 2, 3, 4], 10, true);
        //this.animations.play('idle');
    }

    playAnimation(name) {
        this.animations.play(name);
    }

    playDefault() {
        this.animations.play('idle');
    }

}
