var eventQueue = [
    // {
    //     eventId: 123,
    //     eventActions: ['answer']
    //     requestedAction: 'answer',
    //     device: ['tv', 'phone'],
    //     status: 'pending' // pending / complete / ignored
    // }
];

var Events = {
    getEvents: function(req, callback) {
        var deviceType = req.body.deviceType;
        var eventArray = [];
        eventQueue.forEach(function(event) {
            if (event.device.indexOf(deviceType) >=0) {
                eventArray.push(event);
            }
        });

        return eventArray;
    },
    
    putEvent: function(req, callback) {
        
        if (req.body.event) {
            console.log('Event Recieved', event);
            var newEvent = req.body.event;

            var exists = false;
            for (var i=0; i < eventQueue.length; i++) {
                if (eventQueue[i].eventId === newEvent.eventId) {
                    eventQueue[i] = newEvent;
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                eventQueue.push(newEvent);
                callback(null, 'New event added');
            } else {
                callback(null, 'Event updated');
            }
        } else {
            callback('No event found in request');
        }
    },
    updateEvent: function(req, callback) {

    }
};

module.exports = Events;
