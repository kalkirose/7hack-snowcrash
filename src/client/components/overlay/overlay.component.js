angular.module('7hack.overlay', ['7hack.interaction'])
.directive('overlay', [ function() {
    return {
        templateUrl: 'overlay/overlay.tpl.html',
        restrict: 'E',

        controller: function($scope, InteractionService) {

            $scope.showOverlay = false;

            var receiver = {
                notify: function(key, data) {
                    console.log('Receiver Notified');
                    if (key === 113 || key === 13) {
                        console.log('Toggleing Overlay');
                        $scope.showOverlay = !$scope.showOverlay;
                        $scope.$apply();                        
                    }
                },
                keys: [113, 13]
            };

            InteractionService.registerReceiver(receiver);

        }
    };
}]);