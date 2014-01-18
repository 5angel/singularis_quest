var app = angular.module('game', []);

function Entity(x, y) {
  var position, direction = 0;

  this.getPosition = function () {
    return { x: position.x, y: position.y };
  };

  this.setPosition = function (x, y) {
    position = { x: x || 0, y: y || 0 };
	console.log('Position is set to [' + x.toString() + ';' + y.toString() + ']');
  };

  this.getDirection = function () {
    return direction;
  };

  this.setDirection = function (value) {
    value = value < 0
	  ? 3
	  : value;

    value = value > 3
	  ? 0
	  : value;

	direction = value;

	var DIRECTIONS = ['north', 'east', 'south', 'west'];

	console.log('Direction is set to', DIRECTIONS[direction]);
  };

  this.setPosition(x, y);
};

function Level(collisions, width) {
  collisions = collisions || new Array(25);
  width = width || 5;

  var length = collisions.length;

  if (collisions.length % width !== 0)
    console.error('Level has invalid dimensions!');

  this.getCollisions = function (x, y) {
    if (x === undefined && y === undefined)
      return collisions.slice();
	else {
	  x = x || 0;
	  y = y || 0;

	  return collisions[(y * width) + x];
	}
  };

  this.getDimensions = function () {
    return {
	  length: length,
	  width: width,
	  height: length / width
	}
  };
}