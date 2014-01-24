function GameObject(_x, _y) {
  if (arguments.length === 0)
    return;

  GameObject.lastId = GameObject.lastId || 0;
  GameObject.lastId++;
  
  var _id = GameObject.lastId;

  this.id = function () {
    return _id;
  };

  this.position = function (x, y) {
    if (typeof x === 'undefined' && typeof y === 'undefined')
        return { x: _x, y: _y };
    else {
      if (_x === x && _y === y)
	    return;
	  if (typeof x === 'number')
	    _x = Math.round(x);
	  if (typeof y === 'number')
	    _y = Math.round(y);

	  console.log('Position of "' + _id.toString() + '" is set to [' + _x.toString() + ';' + _y.toString() + ']');
	}

	_x = _x || 0;
	_y = _y || 0;
  };

  this.position(_x, _y);
};

function Entity(_x, _y, _direction) {
  GameObject.apply(this, arguments);

  var DIRECTIONS = ['north', 'east', 'south', 'west'];

  this.direction = function (value) {
    if (typeof value === 'undefined')
	  return _direction;
	else if (typeof value === 'number') {
	  value = value < 0 ? 3 : value;
	  value = value > 3 ? 0 : value;
	  _direction = Math.round(value);

	  console.log('Direction of "' + this.id().toString() + '" is set to', DIRECTIONS[_direction]);
	} else
	  _direction = 0;
  };

  this.direction(_direction);
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

Sign.inherits(GameObject);

function Level(_collisions, _width, objects) {
  _collisions = _collisions || new Array(25);
  _width = _width || 5;
  _objects = {};

  var length = _collisions.length;

  if (length % _width !== 0)
    console.error('Level has invalid dimensions!');

  if (Object.prototype.toString.call(objects) === '[object Array]') {
    objects.forEach(function (item) {
	  if (item instanceof GameObject) {
	    var pos = item.position();

		pos.x = Math.max(0, Math.min(pos.x, _width));
		pos.y = Math.max(0, Math.min(pos.y, length / _width));

		item.position(pos.x, pos.y);

		var index = (pos.y * _width) + pos.x;

		var array = _objects[index] || [item];
		_objects[index] = array;

		if (array.indexOf(item) === -1)
		  array.push(item);
	  }
	});
  };

  this.getObjects = function (x, y) {
	x = x || 0;
	y = y || 0;

	if (x < 0 || x >= _width || y < 0 || y >= length / _width)
	  return [];

	var index = (y * _width) + x;

	return _objects[index] || [];
  };

  this.getCollisions = function (x, y) {
    if (x === undefined && y === undefined)
      return _collisions.slice();
	else {
	  x = x || 0;
	  y = y || 0;

	  if (x < 0 || x >= _width || y < 0 || y >= length / _width)
	    return 1;

	  return _collisions[(y * _width) + x];
	}
  };

  this.getDimensions = function () {
    return {
	  length: length,
	  width: _width,
	  height: length / _width
	}
  };
}