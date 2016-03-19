//var eventQueue = [
    // {
    //     eventId: 123,
    //     device: ['tv', 'phone'],
    //     status: 'pending' // pending / complete / ignored,
    //     data: {
    //          ringing: ''
    //          contactName: ''
    //          contactPhone: '' 
    //          image: '' 
    //     } // Different per event
    // }
//];

var Events = {
    eventQueue: [],
    getEvents: function(req, callback) {
        if (req.body.deviceType) {
            var deviceType = req.body.deviceType;
            console.log('Device Type');
            var eventArray = [];
            Events.eventQueue.forEach(function(event) {
                if (event.devices.indexOf(deviceType) >=0) {
                    eventArray.push(event);
                    console.log('Adding Event')
                }
            });

            callback(null, eventArray);
        } else {
            callback('No device type received');
        }
    },
    
    putEvent: function(req, callback) {
        
        if (req.body.event) {
            console.log('Event Recieved', req.body.event);
            var newEvent = req.body.event;

            var exists = false;
            for (var i=0; i < Events.eventQueue.length; i++) {
                if (Events.eventQueue[i].eventId === newEvent.eventId) {
                    Events.eventQueue[i] = newEvent;
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                Events.eventQueue.push(newEvent);
                callback(null, 'New event added');
            } else {
                callback(null, 'Event updated');
            }
        } else {
            callback('No event found in request');
        }
    }
};

module.exports = Events;
