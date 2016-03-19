angular.module('7hack.events', [])
.service('EventService', ['$window', '$http', '$timeout', function($window, $http, $timeout) {
    var service = {};

    /*
        Broadcast Example
        {
            notify: function(),
            type: ''
        }
    */
    service.broadcastArray = [];

    service.registerReceiver = function(receiver) {
        service.broadcastArray.push(receiver);
    };

    service.cron = function() {
        $timeout( function(){ 
            service.requestEvents(); 
            service.cron();
        }, 1000);
    };

    service.processedEvents = [];

    service.requestEvents = function() {
        return $http.put(
            '/state', 
            {
                deviceType: 'tv'
            }
        ).then(function (response) {
            //console.log(response.data);

            // Process imediate response events
            if (response.data.eventQueue && response.data.eventQueue.length) {
                console.log('Should not be here');
                response.data.eventQueue.forEach(function(event) {
                    service.broadcastArray.forEach(function(receiver){
                        if (receiver.type === event.type) {
                            receiver.notify(event);    
                        }
                    });
                });
            }

            // Process timed response events
            if (response.data.preDefinedEvents && response.data.preDefinedEvents.length) {
                var serverTime = response.data.serverTime;

                response.data.preDefinedEvents.forEach(function(event) {
                    if (event.start <= serverTime && event.end <= serverTime) {
                        if (service.processedEvents.indexOf(event.eventId) < 0) {
                            service.processedEvents.push(event.eventId);
                            
                            console.log('Processed Events', service.processedEvents);

                            console.log('Firing Event', event);

                            service.broadcastArray.forEach(function(receiver){
                                if (receiver.type === event.type) {
                                    receiver.notify(event);    
                                }
                            });
                        }
                    }                    
                });
            }
        });
    };

    service.pushEvent = function(event) {
        $http.put('/event', {event:event}).then(function() {
            service.requestEvents();
        });
    };

    // service.cron();

    return service;
}]);