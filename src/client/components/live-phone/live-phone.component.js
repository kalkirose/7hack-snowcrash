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
            $scope.ringing = true;
            $scope.contactName = 'test';
            $scope.contactNumber = '';
            $scope.contactImage = '';

            $scope.status.show = $scope.ringing;

            EventService.registerReceiver({
                notify: function(event) {
                    var data = event.data;
                    console.log('Notifiying View', data);
                    $scope.ringing = (data.callState == "1") ? true: false;
                    $scope.contactName = data.contactName;
                    $scope.contactNumber = data.contactNumber;
                    $scope.contactImage = data.contactImage;
                },
                messageType: 'phone'
            });

            InteractionService.registerReceiver({
                notify: function(keyCode, data) {
                    // Enter/Red Button Pressed, answer call
                    if (keyCode === 113 || keycode === 13){

                        $scope.ringing  = false;
                        $scope.status.show = false;
                    }

                    // Control/Green Button pressed, hangup
                    if (keyCode === 1 || keyCode === 2) {
                        EventService.pushEvent(
                            {
                                eventId: 123,
                                devices: ['phone'],
                                status: 'pending', // pending / complete / ignored / received
                                data: {
                                    action: 'answer'
                                }
                            }
                        );

                        $scope.ringing  = false;
                        $scope.status.show = false;
                    }
                },
                keys: [
                    113,
                    13
                ]

            });

            
        }
    };
});
