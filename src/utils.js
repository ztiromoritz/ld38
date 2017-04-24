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





export const getGIDs = (value, map, property)  => {
    var keys, i, i2, result = [];
    if (typeof (property) === "undefined") {
        property = "type";
    }
    for (i = 0; i < map.tilesets.length; i++) {
        if (!(map.tilesets[i].hasOwnProperty("tileProperties"))) {
            continue;
        }
        keys = Object.keys(map.tilesets[i].tileProperties);
        for (i2 = 0; i2 < keys.length; i2++) {
            if ((map.tilesets[i].tileProperties[keys[i2]].hasOwnProperty(property)) &&
                (map.tilesets[i].tileProperties[keys[i2]][property] === value)) {
                result.push(parseInt(keys[i2], 10) + parseInt(map.tilesets[i].firstgid, 10))
            }
        }
    }
    if (result.length === 0)
        console.error("Error: No GIDs found! " + value);
    return result;
};



export const getTileProperties = (gid, map) => {
    for (let i = 0; i < map.tilesets.length; i++) {
        var tileset = map.tilesets[i];
        if (tileset.firstgid <= gid && gid < tileset.firstgid + tileset.total) {
            return tileset.tileProperties[gid - tileset.firstgid] || {};
        }
    }
    return {};
};



// ========== setInterval dropin =============
// Code taken from here: https://gist.github.com/joelambert/1002116
// Created by http://www.joelambert.co.uk
// MIT-License: http://www.opensource.org/licenses/mit-license.php
const requestAnimFrame = (function() {
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();


export const requestInterval = (fn, delay) => {
	if( !window.requestAnimationFrame       &&
		!window.webkitRequestAnimationFrame &&
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      &&
		!window.msRequestAnimationFrame)
			return window.setInterval(fn, delay);

	var start = new Date().getTime(),
		handle = new Object();

	function loop() {
		var current = new Date().getTime(),
			delta = current - start;

		if(delta >= delay) {
			fn.call();
			start = new Date().getTime();
		}

		handle.value = requestAnimFrame(loop);
	};

	handle.value = requestAnimFrame(loop);
	return handle;
}

export const clearRequestInterval = (handle)  => {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle);
};



export const requestTimeout = (fn, delay) => {
	if( !window.requestAnimationFrame      	&&
		!window.webkitRequestAnimationFrame &&
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      &&
		!window.msRequestAnimationFrame)
			return window.setTimeout(fn, delay);

	var start = new Date().getTime(),
		handle = new Object();

	function loop(){
		var current = new Date().getTime(),
			delta = current - start;

		delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
	};

	handle.value = requestAnimFrame(loop);
	return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
export const clearRequestTimeout = (handle) => {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearTimeout(handle);
};



//======================================================
