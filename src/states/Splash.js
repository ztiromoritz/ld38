import Phaser from 'phaser';


import tilemap from 'assets/tilemap.json';
import tiles from 'assets/tiles.png';
import sprites from 'assets/32x32_spritesheet.png';
import extraLayerHack from 'assets/extraLayerHack.png';

import title from 'assets/title.png';

import plop from 'assets/plop.wav';
import whilee from 'assets/while.wav';
import knister from 'assets/knister.wav';
import schalter from 'assets/schalter.wav';
import jump from 'assets/jump.wav';


import { centerGameObjects } from 'app/utils';


export default class extends Phaser.State {
    init() {}

    preload() {
        //Ladebalken
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);
        this.load.setPreloadSprite(this.loaderBar);


        this.load.tilemap('tilemap', null, tilemap, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', sprites);
        this.load.image('extraLayerHack', extraLayerHack);
        this.load.image('title', title);
        this.load.spritesheet('sprites', sprites, 32, 32);

        //this.load.audio('clack', clack);
        this.load.audio('plop', plop);
        this.load.audio('whilee', whilee);
        this.load.audio('knister',knister);
        this.load.audio('schalter',schalter);
        this.load.audio('jump',jump);

    }

    create() {
        this.state.start('TitleScreen');
    }

}
