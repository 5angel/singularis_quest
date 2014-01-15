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

	var name = (function () {
	  switch (direction) {
	    case 0:
		  return 'north';
		  break;
		case 1:
		  return 'east';
		  break;
		case 2:
		  return 'south';
		  break;
		case 3:
		  return 'west';
		  break;
	  };
	}) ();

	console.log('Direction is set to', name);
  };

  this.setPosition(x, y);
};