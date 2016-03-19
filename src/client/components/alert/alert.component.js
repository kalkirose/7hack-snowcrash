angular.module('7hack.alert', ['7hack.livePhone'])

.directive('alert', 
  [ 
  function() {  
    return {
        templateUrl: 'alert/alert.tpl.html',
        restrict: 'E',

        controller: function($scope) {
            $scope.status = {
                show: false
            };
        }
    };
}]);
