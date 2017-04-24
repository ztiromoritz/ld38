import Color from 'app/utils/Color';

export default class extends Phaser.Group {

    constructor({ game, x, y , config}) {
        super(game);
        this.add(game.add.sprite(x, y, 'sprites',34));
        this.add(game.add.sprite(x+32, y, 'sprites',35));
        this.add(game.add.sprite(x+64, y, 'sprites',36));

        this.add(game.add.sprite(x,y+32, 'sprites',42));
        this.add(game.add.sprite(x+32, y+32, 'sprites',43));
        this.add(game.add.sprite(x+64, y+32, 'sprites',44));

        this.add(game.add.sprite(x, y+64, 'sprites',50));
        this.add(game.add.sprite(x+32, y+64, 'sprites',51));
        this.add(game.add.sprite(x+64, y+64, 'sprites',52));

        this.add(game.add.sprite(x, y+96, 'sprites',58));
        this.add(game.add.sprite(x+32, y+96, 'sprites',59));
        this.add(game.add.sprite(x+64, y+96, 'sprites',60));


        const todo = game.add.text(x+10,y+20,'TODO', {fontSize: 18});
        this.add(todo);



        this.state = {
            target : {
                [Color.ORANGE_GREEN]: config.og,
                [Color.GREEN_PURPLE]: config.gp,
                [Color.PURPLE_ORANGE]: config.po
            },
            current : {
                [Color.ORANGE_GREEN]: 0,
                [Color.GREEN_PURPLE]: 0,
                [Color.PURPLE_ORANGE]: 0
            }
        };

        this.texts = {
            [Color.ORANGE_GREEN]: game.add.text(x+10,y+45,'', {fontSize: 18}),
            [Color.GREEN_PURPLE]: game.add.text(x+10,y+70,'', {fontSize: 18}),
            [Color.PURPLE_ORANGE]: game.add.text(x+10,y+95,'', {fontSize: 18})
        }

        this.updateText();

    }

    updateText(){
        _.forEach(this.texts, (t, color)=>{
            t.text = `${this.state.current[color]}/${this.state.target[color]}`;
        });
    }

    checkWin(){
        let win = true;
        _.forEach(this.state.target, (targetValue,color)=>{
            if(targetValue > this.state.current[color])
                win = false;
        })
        //TODO: if(win) {HORRRAY!!}
    }

    increaseColor(color){
        this.state.current[color] +=1;
        this.updateText();
        this.checkWin();
    }


}
