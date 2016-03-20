var Events = require('../events');
var Time = require('../time');
var ip = require('ip');

var stateData = {
    "preDefinedEvents": [
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
            "start": 130,
            "end": 140,
            "devices": [
                "tv"
            ]
        }
    ]
};

var State = {
    getState: function(req, callback) {
        var response = {
            //preDefinedEvents: stateData.preDefinedEvents 
        };
        Events.getEvents(req, function(err, eventQueue) {
            if (err) {
                callback(err);
            } else {

                response.eventQueue = eventQueue;  

                Time.getTime(function(err, currentTime) {
                    if (err) {
                        response.serverTime = 'Error fetching server time';
                    } else {
                        response.serverTime = currentTime;
                    }

                    response.serverAddress = ip.address() + ':1337';

                    callback(null, response);
                });
            }
        });        
    }
};

module.exports = State;