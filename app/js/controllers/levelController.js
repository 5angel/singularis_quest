app.controller('LevelController', ['$scope', function ($scope) {
  console.log('LevelController init');

  var level = {
    width: 5,
	map: [
      1, 1, 0, 0, 1,
	  0, 0, 0, 0, 0,
	  0, 1, 0, 0, 0,
	  0, 0, 0, 0, 0
	]
  }; 

  $scope.layers = ['back', 'mid', 'front', 'before'];

  $scope.getRangeAt = function (y) {
    var length = (function (value) {
	  switch (value) {
		case 0:
		  return 2;
		  break;
	    case 1:
		  return 3;
		  break;
		default:
		  return 5;
		  break;
	  }
	}) (y);

    return new Array(length);
  };

  $scope.getWallClass = function (x, range) {
    var str = 'wall_';

	if (range > 2 && Math.ceil((range + 1) / 2) === x + 1) {
	  return 'wall_center';
	} else {
	  if (x === 0 || (x === 1 && range === 5))
	    str += 'left';
	  else
	    str += 'right';

	  if (range === 5 && (x === 1 || x === 3))
	    str += ' wall_half';
	}

	return str;
  };

  $scope.wallPresentAt = function (x, y, range) {
    x = x - Math.floor(range / 2);
	x = range === 2 && x === 0 ? 1 : x;

	var pos = { x: 2, y: 3 }
	var dx = pos.x + x, dy = pos.y - y;

	return level.map[(dy * level.width) + dx] === 1;
  };

  $scope.$on('$destroy', function () {
    console.log('LevelController destroy');
  });
}]);