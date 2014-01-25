app.directive('gameSign', [function () {
  var SPEED_TYPING  = 40;
  var SPEED_WAITING = 280;

  return {
    scope: {
	  gameSign: '=gameSign'
	},
    link: function (scope, element, attrs) {
	  var waiting;

      scope.$watch('gameSign', function (value) {
		if (waiting)
		  clearInterval(waiting);

	    if (!value)
		  return;

	    var length = 1;

	    function next() {
		  element.html(value.substr(0, length) + '_');
		}

		next();

		var typing = setInterval(function () {
		  if (length <= value.length) {
		    length++;
		    next();

			while (/\s/.test(value.charAt(length))) {
			  length++;
			  next();
			}
		  } else {
		    clearInterval(typing);
			scope.$emit('$gameSignFinishedTyping');

			waiting = setInterval(function () {
			  if (element.html().charAt(value.length) === '_')
			    element.html(value.substr(0, value.length));
			  else
			    element.html(value + '_');
			}, SPEED_WAITING);
		  }
		}, SPEED_TYPING);
	  });
    }
  }
}]);