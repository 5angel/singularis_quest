app.controller('LevelController', ['$scope', function ($scope) {
  console.log('LevelController init');

  function makeRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeNoiseMap(length) {
    var map = new Array(length);

    for (var i = 0; i < length; ++i)
	  map[i] = makeRandomFromRange(0, 1);

	return map;
	return [
	  1, 1, 0, 0, 1,
	  0, 0, 0, 1, 0,
	  1, 1, 0, 0, 1,
	  0, 0, 0, 1, 0
	]
  }

  var level = {
    width: 5,
	map: makeNoiseMap(20)
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

  $scope.wallPresentAt = function (x, y, range) {
	var pos = { x: 2, y: 3 }

	var dx = range === 3
	  ? pos.x + (x - 1)
	  : pos.x + (x - 2);
	var dy = pos.y - (3 - y);

	return level.map[(dy * level.width) + dx] === 1;
  };

  $scope.$on('$destroy', function () {
    console.log('LevelController destroy');
  });
}]);