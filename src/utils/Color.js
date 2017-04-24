const RED = 0;
const YELLOW = 8;
const BLUE = 16;
const ORANGE = 3;
const GREEN = 11;
const PURPLE = 19;
const ORANGE_GREEN = 6;
const GREEN_PURPLE = 14;
const PURPLE_ORANGE = 22;


//sorted so key(RED,BLUE) == Key(BLUE,RED)
const key = (c1, c2) => c1 < c2 ? (c1 << 8) | c2 : (c2 << 8) | c1; //MUUHAHAHAHAHAHA!!!!!

//Defines the merge rules.
const mapping = {
    [key(RED, YELLOW)]: ORANGE,
    [key(YELLOW, BLUE)]: GREEN,
    [key(BLUE, RED)]: PURPLE,
    [key(ORANGE, GREEN)]: ORANGE_GREEN,
    [key(GREEN, PURPLE)]: GREEN_PURPLE,
    [key(PURPLE, ORANGE)]: PURPLE_ORANGE
}

const merge = (c1, c2) => { return mapping[key(c1, c2)]; }

//Spritesheet indizes for Bubble/Car
const Color = {
    RED,
    YELLOW,
    BLUE,
    ORANGE,
    GREEN,
    PURPLE,
    ORANGE_GREEN,
    GREEN_PURPLE,
    PURPLE_ORANGE,
    merge
};

Color.idleColors = [RED,YELLOW,GREEN,BLUE,ORANGE,GREEN,PURPLE];
Color.finalColors = [ORANGE_GREEN,GREEN_PURPLE,PURPLE_ORANGE];

/*
(function(){
    console.log("Assert: ",GREEN,"Color.merge():",Color.merge(YELLOW,BLUE));
    console.log("Assert: ",GREEN,"Color.merge():",Color.merge(BLUE,YELLOW));
})();
*/



export default Color;
