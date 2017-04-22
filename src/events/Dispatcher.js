import Phaser from 'phaser';

class Dispatcher {

    constructor() {
        this.pointsUpdated = new Phaser.Signal();

    }

    onPointsUpdated(callback) {
        this.pointsUpdated.add(callback);
    }

    updatePoints(value) {
        this.pointsUpdated.dispatch(value);
    }

};

const instance = new Dispatcher();

export default instance;
