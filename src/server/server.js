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

var clientPath = '/../../tmp';
var basePath = '/../../';
var assetPath = clientPath + '/assets';

router.get('/', function(req, res){
    Client.getClientData(req, function(err, clientInfo, clientObject){
        // res.setHeader('Content-Type', "text/html");
        res.setHeader('Set-Cookie', "clientId=" + clientObject.clientId);
        res.sendFile(path.join(__dirname + clientPath + '/index.html'));
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
        });
    });
});

console.log('Dir:', __dirname);
console.log('Assets:', __dirname + assetPath);

app.use(bodyParser.json())

app.use('/assets', express.static(__dirname + assetPath ));
// app.use(express.static(clientPath + '/assets/jwplayer'));
// app.use('/assets', express.static('../../tmp/assets'));
// app.use('/', express.static('../../tmp/assets'));
// app.use('/static', express.static('static'));
app.use('/node_modules', express.static(basePath + 'node_modules'));

app.use("/", router);


app.listen(1337, function(){
  console.log('listening on 127.0.0.1:1337');
});
