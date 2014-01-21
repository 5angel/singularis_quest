var app = angular.module('game', []);

function Entity(_x, _y) {
  var DIRECTIONS = ['north', 'east', 'south', 'west'];

  Entity.lastId = Entity.lastId || 0;
  Entity.lastId++;

  var _id = Entity.lastId;
  var _direction = 0;

  this.id = function () {
    return id;
  };

  this.position = function (x, y) {
    if (typeof x === 'undefined' && typeof y === 'undefined')
        return { x: _x, y: _y };
    else {
	  if (typeof x === 'number')
	    _x = Math.round(x);
	  if (typeof y === 'number')
	    _y = Math.round(y);

	  console.log('Position of "' + _id.toString() + '" is set to [' + _x.toString() + ';' + _y.toString() + ']');
	}

	_x = _x || 0;
	_y = _y || 0;
  }

  this.direction = function (value) {
    if (typeof value === 'undefined')
	  return _direction;
	else if (typeof value === 'number') {
	  value = value < 0 ? 3 : value;
	  value = value > 3 ? 0 : value;
	  _direction = Math.round(value);

	  console.log('Direction of "' + _id.toString() + '" is set to', DIRECTIONS[_direction]);
	}
  };

  this.position(_x, _y);
};

function Level(_collisions, width) {
  _collisions = _collisions || new Array(25);
  width = width || 5;

  var length = _collisions.length;

  if (_collisions.length % width !== 0)
    console.error('Level has invalid dimensions!');

  var objects = [];

  this.getCollisions = function (x, y) {
    if (x === undefined && y === undefined)
      return _collisions.slice();
	else {
	  x = x || 0;
	  y = y || 0;

	  if (x < 0 || x >= width || y < 0 || y >= length / width)
	    return 1;

	  return _collisions[(y * width) + x];
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