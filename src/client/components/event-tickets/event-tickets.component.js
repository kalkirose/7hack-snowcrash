    // {
    //     eventId: 123,
    //     eventActions: ['answer']
    //     requestedAction: 'answer',
    //     device: ['tv', 'phone'],
    //     status: 'pending' // pending / complete / ignored
    // }
    // 

angular.module('7hack.eventTickets', ['7hack.events', '7hack.interaction'])

.directive('eventTickets', 
  [ 'EventService', 'InteractionService',
  function(EventService, InteractionService) {  
    return {
        templateUrl: 'event-tickets/event-tickets.tpl.html',
        restrict: 'E',
        scope: {
            status: '='
        },

        controller: function($scope) {
            $scope.showEvent = false;

            $scope.status.showEvent = false;
            $scope.message = "UpcomingEvent";

            EventService.registerReceiver({
                notify: function(event) {
                    //var data = event.data;
                    $scope.showEvent = true;
                    $scope.status.showEvent = true;
                    $scope.message = "Sweet offer for you!";
                    console.log('Show EVent', event);
                },
                type: 'tickets'
            });

            InteractionService.registerReceiver({
                notify: function(keyCode, data) {
                    if ($scope.showEvent === true) {
                    // Enter/Red Button Pressed, launch ticket event
                        $scope.showEvent = false;
                        $scope.status.showEvent = false;

                        EventService.pushEvent(
                            {
                                eventId: "333",
                                type: "tickets",
                                devices: ["phone"],
                                status: "pending",
                                data: {
                                    url: "http://7hack.de/"
                                }
                            }
                        );
                    }
                },
                keys: [
                    81
                ]

            });

            InteractionService.registerReceiver({
                notify: function(keyCode, data) {
                    // Green Button Pressed, launch disable ticket
                        $scope.showEvent = false;
                        $scope.status.showEvent = false;
                },
                keys: [
                    87
                ]

            });                 
        }
    };
}]);
