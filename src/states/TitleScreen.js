import Phaser from 'phaser';
import { letterSpacing } from 'app/utils';

export default class extends Phaser.State {

    init() {}
    preload() {}
    create() {

        this.title = new Phaser.Text(
            this.game,
            this.game.width / 2,
            this.game.height / 2 - 100, letterSpacing('STARTSCREEN', 1));
        this.title.font = 'Courier New';
        this.title.padding.set(10, 16);
        this.title.fontSize = 60;
        this.title.fill = '#ee00dd';
        this.title.smoothed = false;
        this.title.anchor.setTo(0.5);
        this.game.add.existing(this.title);

        this.start = new Phaser.Text(
            this.game,
            this.game.width / 2,
            this.game.height / 2 - 40,
            letterSpacing('Press X to start', 2)
        );
        this.start.font = 'Courier New';
        this.start.padding.set(10, 16);
        this.start.fontSize = 40;
        this.start.fill = '#ee00dd';
        this.start.smoothed = false;
        this.start.anchor.setTo(0.5);
        this.game.add.existing(this.start);

        this.game.input.keyboard.addKey(Phaser.Keyboard.X).onDown.add(() => {
            this.state.start('Game');
        });

        //TODO remove
        this.state.start('Game');
    }
    update() {}

    get position() {
        return this.posY;
    }

    set position(y) {
        this.posY = y;
        this.title.y = this.game.height / 2 - 100 + y;
        this.start.y = this.game.height / 2 - 40 + y;
        this.controls.y = this.game.height / 2 + 20 + y;
    }

}
