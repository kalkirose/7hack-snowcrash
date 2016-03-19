var Events = require('../events');

var stateData = {
    "preDefinedEvents": [
        {
            "type": "break_start",
            "start": 48,
            "end": 55,
            "devices": [
                "tv",
                "mobile"
            ]
        },
        {
            "type": "break_end",
            "start": 85,
            "end": 100,
            "devices": [
                "tv",
                "mobile"
            ]
        },
        {
            "type": "break_end",
            "start": 85,
            "end": 100,
            "devices": [
                "tv",
                "mobile"
            ]
        },
        {
            "type": "ikea_couch_1",
            "start": 159,
            "end": 162,
            "devices": [
                "tv"
            ]
        },
        {
            "type": "break_start",
            "start": 245,
            "end": 253,
            "devices": [
                "mobile",
                "tv"
            ]
        },
        {
            "type": "xmen_tickets",
            "start": 253,
            "end": 260,
            "devices": [
                "mobile",
                "tv"
            ]
        },
        {
            "type": "break_end",
            "start": 266,
            "end": 501,
            "devices": [
                "tv",
                "mobile"
            ]
        }
    ]
};

var State = {
    getState: function(req, callback) {
        var response = {
            preDefinedEvents: stateData.preDefinedEvents 
        };
        Events.getEvents(req, function(err, eventQueue) {
            if (err) {
                callback(err);
            }
            response.eventQueue = eventQueue;  
            callback(null, response);
        });        
    }
};

module.exports = State;