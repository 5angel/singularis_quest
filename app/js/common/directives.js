app.directive('gameSign', [function () {
  var SPEED_DEFAULT = 40;

  return {
    scope: {
	  gameSign: '=gameSign'
	},
    link: function (scope, element, attrs) {
      scope.$watch('gameSign', function (value) {
	    var length = 1;

	    function next() {
		  element.html(value.substr(0, length));
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
		  }
		}, SPEED_DEFAULT);
	  });
    }
  }
}]);