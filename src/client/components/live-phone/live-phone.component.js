    // {
    //     eventId: 123,
    //     eventActions: ['answer']
    //     requestedAction: 'answer',
    //     device: ['tv', 'phone'],
    //     status: 'pending' // pending / complete / ignored
    // }
    // 

angular.module('7hack.livePhone', ['7hack.events', '7hack.interaction'])

.directive('livePhone', function(EventService, InteractionService) {  
    return {
        templateUrl: 'live-phone/live-phone.tpl.html',
        restrict: 'E',
        scope: {
            status: '='
        },

        controller: function($scope) {
            $scope.ringing = false;
            $scope.contactName = 'test';
            $scope.contactNumber = '';
            $scope.contactImage = '';

            $scope.status.showPhone = $scope.ringing;

            EventService.registerReceiver({
                notify: function(event) {
                    console.log('Event Received');
                    var data = event.data;

                    $scope.ringing = (data.callState == "1") ? true: false;
                    $scope.contactName = data.contactName;
                    $scope.contactNumber = data.contactNumber;
                    $scope.contactImage = data.contactImage;

                    $scope.status.showPhone = true;
                },
                type: 'phone'
            });

            InteractionService.registerReceiver({
                notify: function(keyCode, data) {
                    if ($scope.ringing) {
                        // Enter/Red Button Pressed, answer call
                        if (keyCode === 81){
                            EventService.pushEvent(
                                {
                                    eventId: 222,
                                    type: 'phone',
                                    devices: ['phone'],
                                    status: 'pending', // pending / complete / ignored / received
                                    data: {
                                        action: 'answer'
                                    }
                                }
                            );

                            $scope.ringing  = false;
                            $scope.status.showPhone = false;
                        }

                        // Control/Green Button pressed, hangup
                        if (keyCode === 87 ) {
                            EventService.pushEvent(
                                {
                                    eventId: 222,
                                    type: 'phone',
                                    devices: ['phone'],
                                    status: 'pending', // pending / complete / ignored / received
                                    data: {
                                        action: 'hangup'
                                    }
                                }
                            );

                            $scope.ringing  = false;
                            $scope.status.showPhone = false;
                        }
                    }
                },
                keys: [
                    81,
                    87
                ]

            });

            
        }
    };
});
