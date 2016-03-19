var express = require("express");
var app = express();

//Creating Router() object

var router = express.Router();
var bodyParser = require('body-parser')

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var Pairing = require('./components/pairing');
var Client = require('./components/client');
var State = require('./components/state');
var Events = require('./components/events');
var Time = require('./components/time');

var clientPath = '/../../tmp';
var basePath = '/../../';
var assetPath = clientPath + '/assets';

var baseTime = (new Date).getTime();

router.get('/', function(req, res){
    Client.getClientData(req, function(err, clientInfo, clientObject){
        res.setHeader('Content-Type', "application/vnd.hbbtv.xhtml+xml; charset=UTF-8");
        res.setHeader('Set-Cookie', "clientId=" + clientObject.clientId);
        res.sendFile(path.join(__dirname + clientPath + '/index.html'));
        res.sendFile(path.join(__dirname + clientPath + '/index.html'));
    });
});

router.get('/test', function(req, res){
    Client.getClientData(req, function(err, clientInfo, clientObject){
        // res.setHeader('Content-Type', "text/html");
        res.setHeader('Set-Cookie', "clientId=" + clientObject.clientId);
        res.sendFile(path.join(__dirname + clientPath + '/test.html'));
    });
});

var jsonParser = bodyParser.json();

router.put('/pair', jsonParser,  function(req, res){
    console.log('Pairing Called');
    Client.getClientData(req, function(err, clientInfo, clientObject) {
        res.setHeader('Set-Cookie', "clientId=" + clientObject.clientId);
        Pairing.pairDevice(req, function(err, data) {
            res.json(data);
            res.end();
        });
    });
});

router.get('/client-data', function(req, res){
    Client.getClientData(req, function(err, clientInfo, clientObject) {
        res.setHeader('Set-Cookie', "clientId=" + clientObject.clientId);

        Client.getClientDataFromQuery(req.params, req, function(err, data) {
            console.log('Sending Data', data);
            res.json(data);
            res.end();
        });
    });
});

/** 
 * Events / Event Queue
 */
router.put('/state', jsonParser, function(req, res) {
    State.getState(req, function(err, state) {
        console.log('Sending State', state);
        res.json(state);
        res.end();
    });

});

router.get('/events', function(req, res) {
    Events.getEvents(req, function(err, events) {
        if (err) {
            res.json(err);
        } else {
            res.json(events);
        }
        res.end();
    }) 
});

router.put('/event', jsonParser, function(req, res) {
    Events.putEvent(req, function(err, status) {
        if (err) {
            res.json(err);
        } else {
            res.json(status);
        }
        res.end();
    })
});


/** 
 * Timing
 */

router.get('/time', function(req, res) {
    Time.getTime(function(err, currentTime) {
        if (err) {
            res.json(err);
        } else {
            res.json(currentTime)
        }

        res.end();
    })
});



router.put('/time-offset', function(req, res) {
    Time.setOffset(req, function(err, response) {
        if (err) {
            res.json(err);
        } else {
            res.json(response)
        }

        res.end();  
    });
});

router.put('/time-reset', function(req, res) {
    Time.resetBaseTime(function(err, response) {
        if (err) {
            res.json(err);
        } else {
            res.json(response)
        }

        res.end(); 
    });
});

router.get('/jwplayer.flash.swf', function(req, res) {
    res.setHeader('Content-Type', "application/x-shockwave-flash");
    res.sendFile(path.join(__dirname + assetPath + '/jwplayer.flash.swf'));
    // res.end();
});


// console.log('Dir:', __dirname);
// console.log('Assets:', __dirname + assetPath);

app.use(bodyParser.json())

app.use('/assets', express.static(__dirname + assetPath ));
// app.use(express.static(clientPath + '/assets/jwplayer'));
// app.use('/assets', express.static('../../tmp/assets'));
// app.use('/', express.static('../../tmp/assets'));
// app.use('/static', express.static('static'));
app.use('/node_modules', express.static(basePath + 'node_modules'));
// app.use('/jwplayer.flash.swf', express.static(__dirname + assetPath));

app.use("/", router);


app.listen(1337, function(){
  console.log('listening on 127.0.0.1:1337');
});
