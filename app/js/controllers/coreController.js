app.controller('CoreController', ['$scope', function ($scope) {
  console.log('CoreController init');

  var PLAYER = new Entity(0, 0);

  var level = {
    width: 10,
	map: [
	  0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
	  0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 1, 0, 0
	]
  }

  $scope.wallPresentAt = function (x, y, range) {
	var pos = PLAYER.getPosition();
	var dir = PLAYER.getDirection();

	var dx = (function (value) {
	  switch (value) {
	    case 5:
		  return x - 2;
		  break;
		case 3:
		  return x - 1;
		  break;
		case 2:
		  return x === 0 ? -1 : 1;
		  break;
	  }
	}) (range);

	var dy = 3 - y;

	if (dir >= 2)
	  dx *= -1;

	if (dir === 0 || dir === 3)
	  dy *= -1;

	var px = pos.x + dx, py = pos.y + dy;

	if (dir % 2 === 1) {
      px = pos.x + dy;
	  py = pos.y + dx;
	}

	var width  = level.width,
	    height = level.map.length / width;

	if (px < 0 || px >= width || py < 0 || py >= height)
	  return true;

	var index = (py * level.width) + px;

	return level.map[index] === 1;
  };

  $scope.moveForward = function () {
	var pos = PLAYER.getPosition();
	var dir = PLAYER.getDirection();

	switch (dir) {
	  case 0:
	    pos.y--;
	    break;
	  case 1:
	    pos.x++;
	    break;
	  case 2:
	    pos.y++;
	    break;
	  case 3:
	    pos.x--;
	    break;
	}

	PLAYER.setPosition(pos.x, pos.y);
  };

  $scope.turnRight = function () {
    PLAYER.setDirection(PLAYER.getDirection() + 1);
  };

  $scope.turnLeft = function () {
    PLAYER.setDirection(PLAYER.getDirection() - 1);
  };

  $scope.makeArray = function (length) {
    return new Array(length);
  };

  $scope.getRangeAt = function (index) {
    var length = (function (value) {
	  switch (value) {
	    case 3:
		  return 2;
		  break;
		case 2:
		  return 3;
		  break;
		default:
		  return 5;
		  break;
	  }
	}) (index);

    return $scope.makeArray(length);
  };

  $scope.$on('$destroy', function () {
    console.log('CoreController destroy');
  });
}]);