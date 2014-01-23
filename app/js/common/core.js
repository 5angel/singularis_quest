function GameObject(_x, _y) {
  if (arguments.length === 0)
    return;

  this.name = this.name || 'GameObject';

  GameObject.lastId = GameObject.lastId || 0;
  GameObject.lastId++;
  
  var _id = this.name + '_' + GameObject.lastId.toString();

  delete this.name;

  this.id = function () {
    return _id;
  };

  this.position = function (x, y) {
    if (typeof x === 'undefined' && typeof y === 'undefined')
        return { x: _x, y: _y };
    else {
	  if (typeof x === 'number')
	    _x = Math.round(x);
	  if (typeof y === 'number')
	    _y = Math.round(y);

	  console.log('Position of "' + _id + '" is set to [' + _x.toString() + ';' + _y.toString() + ']');
	}

	_x = _x || 0;
	_y = _y || 0;
  };

  this.position(_x, _y);
};

function Entity(_x, _y) {
  if (arguments.length === 0)
    return;

  this.name = this.name || 'Entity';

  GameObject.apply(this, arguments);

  var DIRECTIONS = ['north', 'east', 'south', 'west'];

  var _direction = 0;

  this.direction = function (value) {
    if (typeof value === 'undefined')
	  return _direction;
	else if (typeof value === 'number') {
	  value = value < 0 ? 3 : value;
	  value = value > 3 ? 0 : value;
	  _direction = Math.round(value);

	  console.log('Direction of "' + this.id() + '" is set to', DIRECTIONS[_direction]);
	}
  };
};

Entity.inherits(GameObject);

function Sign(_x, _y) {
  if (arguments.length === 0)
    return;

  this.name = this.name || 'Sign';

  GameObject.apply(this, arguments);

  var _text = Array.prototype.slice.call(arguments, 2).filter(function (item) {
    return typeof item === 'string';
  });

  this.text = function (index) {
    if (typeof index === 'undefined')
	  return _text.slice();
	else
	  return _text[index];
  };
}

function Level(_collisions, width) {
  _collisions = _collisions || new Array(25);
  width = width || 5;

  var length = _collisions.length;

  if (_collisions.length % width !== 0)
    console.error('Level has invalid dimensions!');

  var objects = [];

  this.getCollisions = function (x, y) {
    if (typeof x === 'undefined' && typeof y === 'undefined')
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
	  width:  width,
	  height: length / width
	}
  };
}