var nedb = require('nedb');
var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "hubba-App" // GitHub is happy with a unique user agent
    }
});

github.authenticate({
    type: "oauth",
    key: "d27b115d9b92702da3bb",
    secret: "0edb955bd4b45fad1a664528a4c3fe0a953ed484"
});

var db = {};
db.clients = new nedb({filename: 'clients.db'});
db.clients.loadDatabase();

function makePairUrlStem() {
    var text = '';
    var possible = '0123456789';

    for(var i=0; i < 4; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function makeClientObject(clientInfo, callback) {
    console.log('called');

    clientInfo.pairCode = makePairUrlStem();
    db.clients.find({ paidCode: clientInfo.pairCode }, function (err, docs) {
        console.log('err', err, 'docs', docs);

        if (docs.length === 0) {
            db.clients.insert(clientInfo);
            callback(null, clientInfo);
        } else {
            makeClientObject(clientInfo, callback);
        }
    });

}

var datastore = {
    getClientForClientInfo: function(clientInfo, callback) {
        db.clients.find({ clientId: clientInfo.clientId }, function (err, docs) {
            if(err) {
                return callback(err);
            }

            if (docs.length === 0) {
                console.log('client not found so adding to db', clientInfo);
                makeClientObject(clientInfo, function(err, data) {
                    console.log('makeClientObject', err, data);
                    callback(err, data);
                });
            } else {
                return callback(null, docs[0]);
                console.log('client found in db', docs);
            }
        });
    },
    getForClientId: function(clientId, callback) {
        db.clients.find({ clientId: clientId }, function (err, docs) {
            if(err) {
                return callback(err);
            }

            if (docs.length === 0) {
                callback(1);
            } else {
                return callback(null, docs[0]);
                console.log('client found in db', docs);
            }
        });
    },
    addDeviceDataToClient: function(data, record, callback) {
        db.clients.update({pairCode: data.pairCode}, { $set: { deviceData: data } }, {}, function (err, numReplaced) {
            console.log('adding device data to paircode', data, data.pairCode, err, numReplaced);
            if (numReplaced > 0) {
                callback(null, record)
            } else {
                callback('update failed', {});
            }
        });
    },
    pairDevice: function(data, callback) {
        db.clients.find({ pairCode: data.pairCode }, function (err, docs) {
            if(err) {
                 return callback(err);
            }
            console.log('find by paircode', data.pairCode, err, docs);
 
            if (docs.length === 0) {
                callback('No pairCode found', {});
                callback(1);
            } else {

                // correct pair code
                if (data.github) {
                    console.log('got this github url', data.github);

                    github.user.getFrom({
                        // optional:
                        // headers: {
                        //     "cookie": "blahblah"
                        // },
                        user: data.github
                    }, function(err, res) {
                        if (!err) {
                            data.avatar = res.avatar_url;
                        }
                        datastore.addDeviceDataToClient(data, docs[0], callback);
                        //console.log('github data', JSON.stringify(res));
                    });
                } else {
                    datastore.addDeviceDataToClient(data, docs[0], callback);
                }
            }
        });
    }
}

module.exports = datastore;