app.directive('gameSign', [function () {
  return {
    scope: {
	  gameSign: '=gameSign'
	},
    link: function (scope, element, attrs) {
      scope.$watch('gameSign', function (value) {
	    element.html(value);
	  });
    }
  }
}]);