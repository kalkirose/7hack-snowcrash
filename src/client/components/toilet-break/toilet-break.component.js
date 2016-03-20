    // {
    //     eventId: 123,
    //     eventActions: ['answer']
    //     requestedAction: 'answer',
    //     device: ['tv', 'phone'],
    //     status: 'pending' // pending / complete / ignored
    // }
    // 

angular.module('7hack.toiletBreak', ['7hack.events', '7hack.interaction'])

.directive('toiletBreak', 
  [ 'EventService', 'InteractionService',
  function(EventService, InteractionService) {  
    return {
        templateUrl: 'toilet-break/toilet-break.tpl.html',
        restrict: 'E',
        scope: {
            status: '='
        },

        controller: function($scope) {
            $scope.showBreak = true;

            $scope.status.showBreak = $scope.showBreak;
            $scope.message = "Upcoming Add Break";

            EventService.registerReceiver({
                notify: function(event) {
                    //var data = event.data;
                    $scope.showBreak = true;
                    $scope.status.showBreak = true;
                    $scope.message = "Upcoming Add Break";
                    // console.log('Notifiying View', event);
                },
                type: 'break_start'
            });

            EventService.registerReceiver({
                notify: function(event) {
                    //var data = event.data;
                    $scope.showBreak = true;
                    $scope.message = "Show starting again soon";

                    //console.log('Notifiying View', data);
                },
                type: 'break_end'
            });

            InteractionService.registerReceiver({
                notify: function(keyCode, data) {
                    // Enter/Red Button Pressed, answer call
                        $scope.showBreak = false;
                        $scope.status.showBreak = false;
                },
                keys: [
                    87
                ]

            });            
        }
    };
}]);
