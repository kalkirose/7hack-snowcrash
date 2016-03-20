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
    eventQueue: [
        // {
        //     eventId: 222,
        //     type: 'phone',
        //     devices: ['tv'],
        //     status: 'pending', // pending / complete / ignored / received
        //     data: {
        //         callState: "1"
        //     }
        // },
        // {
        //     eventId: "333",
        //     type: "tickets",
        //     devices: ["phone"],
        //     status: "pending",
        //     data: {
        //         url: "http://7hack.de/"
        //     }
        // }
    ],
    getEvents: function(req, callback) {
        if (req.body.deviceType) {
            var deviceType = req.body.deviceType;
            console.log('Device Type', deviceType);
            var eventArray = [];
            
            Events.eventQueue.forEach(function(event) {
                console.log('Event to put into queue', event);
                if (event.devices.indexOf(deviceType) >=0 ) {
                    eventArray.push(event);
                    var pos = Events.eventQueue.indexOf(event);
                    Events.eventQueue.splice(pos, 1);
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
