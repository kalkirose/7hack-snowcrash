// Basetime in milliseconds
var baseTime = (new Date).getTime();

// Offset in seconds
var offset = 0;

var Time = {
    getTime: function(callback) {
        var currentTime = (new Date).getTime();

        var timeElapsed = (currentTime - baseTime) / 1000;
        timeElapsed = timeElapsed % 180;
        timeElapsed = Math.round(timeElapsed + offset);

        console.log('Current Time', currentTime);
        console.log('Time Elapsed', timeElapsed);

        callback(null, timeElapsed); 
    },

    setOffset: function(req, callback) {
        if (req.body.offset) {
            offset = req.body.offset;
            callback(null, '200 OK');
        } else {
            callback('No Offset Sent');
        } 
    },

    resetBaseTime: function(callback) {
        baseTime = (new Date).getTime();
        callback(null, '200 Basetime Reset');
    } 
}

module.exports = Time;