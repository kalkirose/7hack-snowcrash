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

    service.preDefinedEvents = [
        {
            "id": 1,
            "type": "break_start",
            "start": 55,
            "end": 61,
            "devices": [
                "tv",
                "mobile"
            ]
        },
        {   
            "id": 2,
            "type": "break_end",
            "start": 115,
            "end": 121,
            "devices": [
                "tv",
                "mobile"
            ]
        },
        {
            "id": 3,
            "type": "tickets",
            "start": 133,
            "end": 140,
            "devices": [
                "tv"
            ]
        }
    ];

    service.processedEvents = [];

    service.requestEvents = function() {
        return $http.put(
            '/state', 
            {
                deviceType: 'tv'
            }
        ).then(function (response) {
            console.log(response.data);

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

            // console.log(service.broadcastArray);

            // Process timed response events
            if (service.preDefinedEvents && service.preDefinedEvents.length) {
                // console.log('predefined events');
                var serverTime = response.data.serverTime;

                service.preDefinedEvents.forEach(function(event) {
                    // console.log('start', event.start);
                    // console.log('end', event.end);
                    // console.log('server', serverTime);
                    if (serverTime >= event.start && serverTime <= event.end) {
                        // console.log('Checkign event id');
                        if (service.processedEvents.indexOf(event.eventId) < 0) {
                            service.processedEvents.push(event.eventId);
                            
                            // console.log('Processed Events', service.processedEvents);

                            // console.log('Firing Event', event);

                            service.broadcastArray.forEach(function(receiver){
                                // console.log('receiverType', receiver.type);
                                // console.log('eventType', event.type);

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