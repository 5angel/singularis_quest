app.controller('CoreController', ['$scope', function ($scope) {
  console.log('CoreController init');

  var PLAYER = new Entity(0, 0, 1);

  var level = new Level([
	0,0,0,0,0,1,0,0,0,0,
    1,1,1,1,0,1,0,0,0,0,
	0,0,0,1,1,1,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0
  ], 10, [
    new Sign(4, 1, 'herp'), new Sign(4, 1, 'derp'),
  ]);

  var singsPending = [];

  $scope.frozen = false;
  $scope.textToType = '';

  function stepForward() {
	var pos = PLAYER.position();
	var dir = PLAYER.direction();

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

	if (level.getCollisions(pos.x, pos.y) === 0) {
	  PLAYER.position(pos.x, pos.y);

	  singsPending = [];

	  level.getObjects(pos.x, pos.y).forEach(function (item) {
	    if (item instanceof Sign) {
		  singsPending = singsPending.concat(item.text());

		  if (!$scope.frozen) {
		    $scope.frozen = true;
			$scope.textToType = singsPending.shift();
		  }
		}
	  });
	}
  };

  $scope.getCollisionAt = function (x, y, range) {
	var pos = PLAYER.position();
	var dir = PLAYER.direction();

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

	var dy = 4 - y;

	if (dir >= 2)
	  dx *= -1;

	if (dir === 0 || dir === 3)
	  dy *= -1;

	var px = pos.x + dx, py = pos.y + dy;

	if (dir % 2 === 1) {
      px = pos.x + dy;
	  py = pos.y + dx;
	}

	return level.getCollisions(px, py);
  };

  var keysLocked = false;

  $scope.onKeyDown = function ($event) {

	if (!keysLocked) {
      keysLocked = true;

	  if (!$scope.frozen) {
	    var dir = PLAYER.direction();

	    switch ($event.keyCode) {
	      case 65:
		    PLAYER.direction(dir - 1);

		    break;
	      case 68:
		    PLAYER.direction(dir + 1);

		    break;
		  case 87:
		    stepForward();

		    break;
	    }
	  } else {
	    console.log('lol');
	  }
	}
  };

  $scope.onKeyUp = function () {
    keysLocked = false;
  };

  $scope.makeArray = function (length) {
    return new Array(length);
  };

  $scope.getRangeAt = function (index) {
    var length = (function (value) {
	  switch (value) {
	    case 4:
		  return 2;

		  break;
		case 3:
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