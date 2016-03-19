angular.module('7hack.interaction', [])
.service('InteractionService', ['$window', function($window) {
    var service = {};

    /*
        Broadcast Example
        {
            notify: function(),
            keys: []
        }
    */
    service.broadcastArray = [];

    service.registerReceiver = function(receiver) {
        service.broadcastArray.push(receiver);
    };

    service.notifyReceivers = function(keyCode, data) {
        service.broadcastArray.forEach(function(receiver) {
            console.log(receiver.keys.indexOf(keyCode));
            console.log(receiver.keys);
            if (receiver.keys.indexOf(keyCode) >= 0) {
                console.log('Notifying reciever');
                receiver.notify(keyCode, data);
            }
        });
    };

    $window.document.addEventListener("keyup", function(event) {
        service.notifyReceivers(event.keyCode);
    });

    return service;
}]);