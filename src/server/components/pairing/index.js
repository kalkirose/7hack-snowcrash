var Datastore = require('../datastore/');

var Pairing = {
    pairDevice: function(req, callback) {
        console.log('Pairing.pairDevice', req.body);
        if (req.body.pairCode) {
            //console.log('Pair Code', req.params.pairCode);

            var pairDeviceData = {
                'pairCode': req.body.pairCode,
                'userAgent': req.headers['user-agent'],
                'clientIp': req.connection.remoteAddress         
            };

            console.log('Pair Devie Data', pairDeviceData);

            Datastore.pairDevice(pairDeviceData, function(err, data) {
                console.log('pair device callback called', err, data);
                if (err) {
                    var responseData = {
                        message: 'pairCode not valid'
                    };
                } else {
                    
                    var responseData = {
                        'status': 'ok',
                        'message': 'pairing successful',
                        'data': data
                    };

                    // datastore.getForClientId(data.clientId, function(err, clientData) {
                    //     pushToClientStream.notifyPaired(clientData);
                    // });
                }

                callback(null, responseData);

            });
        }
    }
};

module.exports = Pairing;