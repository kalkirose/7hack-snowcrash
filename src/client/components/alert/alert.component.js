angular.module('7hack.alert', ['7hack.livePhone', '7hack.toiletBreak', '7hack.eventTickets'])

.directive('alert', 
  [ 
  function() {  
    return {
        templateUrl: 'alert/alert.tpl.html',
        restrict: 'E',

        controller: function($scope) {
            $scope.status = {
                showBreak: false,
                showPhone: false
            };
        }
    };
}]);
