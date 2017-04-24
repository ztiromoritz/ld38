export default class extends Phaser.Sprite {

    constructor({ game, x, y }) {
        super(game, x, y, 'sprites', 0 /*frame*/ );

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        game.physics.arcade.enable(this);

        this.body.setSize(30, 30, 0, 0);
        this.body.bounce.y = 0.0;
        this.body.gravity.y = 2000;
        this.body.collideWorldBounds = true;
        this.body.mass = 0;

        this.cursors = game.input.keyboard.createCursorKeys();
        this.canJump = true;
        this.cursors.up.onUp.add(function() {
            this.canJump = true;
        }, this);



        this.animations.add('idle', [45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 37], 10, true);
        this.animations.add('walk', [32, 33], 8, true);
        this.animations.add('jump', [28], 10, true);
        this.animations.play('idle');
    }

    update() {
        let idle = true;
        this.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -450;
            this.animations.play('walk');
            idle = false;
        } else if (this.cursors.right.isDown ) {
            this.body.velocity.x = 450;
            this.animations.play('walk');
            idle = false;
        }
        if ((this.cursors.up.isDown) &&
            (this.body.onFloor() || this.body.touching.down) &&
            this.canJump) {
            this.body.velocity.y = -900;
            idle = false;
            this.canJump = false;
            //this.jump.play();
        }
        if(this.cursors.down.isDown){
            this.body.velocity.y = 600;
        }

        if(!this.body.onFloor()){
            this.animations.play('jump');
        }else if (idle){
            this.animations.play('idle');
        }else {
            this.animations.play('walk');
        }

    }

}
