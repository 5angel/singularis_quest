app.controller('LevelController', ['$scope', function ($scope) {
  console.log('LevelController init');

  $scope.$on('$destroy', function () {
    console.log('LevelController destroy');
  });
}]);