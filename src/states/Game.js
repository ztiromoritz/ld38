/* globals __DEV__ */
import _ from 'lodash';
import Phaser from 'phaser';

import Baseline from 'app/sprites/Baseline';
import Dispatcher from 'app/events/Dispatcher';
import config from 'app/config';



export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.keyHandler('A'));
    }

    update() {}

    keyHandler(key) {
        return () => {};
    }

    render() {
        if (__DEV__) {
            // this.game.debug.spriteInfo(this.mushroom, 32, 32);
        }
    }
}
