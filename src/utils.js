import _ from 'lodash';

export const centerGameObjects = (objects) => {
    objects.forEach(function(object) {
        object.anchor.setTo(0.5);
    });
};

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const HAIRSPACE = '\u200A';

export const letterSpacing = (str, value) => {
    const space = _.repeat(HAIRSPACE, value);
    return _.join(_.map(str, (c) => { return c + space; }), '');
};
