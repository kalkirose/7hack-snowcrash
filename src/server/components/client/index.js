var Datastore = require('../datastore/');

var client = {

    parseCookies: function (request) {
        var list = {},
            rc = request.headers.cookie;

        rc && rc.split(';').forEach(function( cookie ) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        return list;
    },

    makeId: function() {
        return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    getClientInfo: function(req) {
        /*
        {"clientId":"94ef550d-9d80-4619-8367-973de0695b45","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36","clientIp":"::ffff:127.0.0.1"}
        */
        var clientInfo = {};
        var cookies = client.parseCookies(req);
        if (cookies['clientId']) {
            clientInfo['clientId'] = cookies['clientId'];
        } else {
            clientInfo['clientId'] = client.makeId();
        }
        clientInfo['userAgent'] = req.headers['user-agent'];
        clientInfo['clientIp'] = req.connection.remoteAddress;
        return clientInfo;
    },

    getClientId: function(req) {
        var clientId = '';
        var cookies = client.parseCookies(req);
        if (cookies['clientId']) {
            clientId = cookies['clientId'];
        } 

        return clientId;
    },

    getClientData: function(req, callback) {
        var clientInfo = client.getClientInfo(req);
        Datastore.getClientForClientInfo(clientInfo, function(err, clientObject){

            callback(null, clientInfo, clientObject);
        });
    },

    getClientDataFromQuery: function(query, request, callback) {
        var clientId = '';
        if (query.clientId !== undefined) {
            clientId = query.clientId;
        } else {
            clientId = client.getClientId(request);
        }

        Datastore.getForClientId(clientId, function(err, clientData) {

            if(err) {
                callback(err);
            }

            callback(null, clientData);
        });
    }
};



module.exports = client;