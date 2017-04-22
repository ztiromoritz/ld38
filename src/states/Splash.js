import Phaser from 'phaser';

import tilemap from 'assets/tilemap.json';
import tiles from 'assets/tiles.png';

import { centerGameObjects } from 'app/utils';


export default class extends Phaser.State {
    init() {}

    preload() {
        //Ladebalken
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);
        this.load.setPreloadSprite(this.loaderBar);

        //this.load.tilemap('tilemap', null, tilemap, Phaser.Tilemap.TILED_JSON);
        //this.load.image('tiles', tiles);

        //this.load.audio('clack', clack);

    }

    create() {
        this.state.start('TitleScreen');
    }

}
