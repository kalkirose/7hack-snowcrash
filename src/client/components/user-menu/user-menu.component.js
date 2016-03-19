angular.module('7hack.userMenu', [])
.directive('userMenu', ['UserMenuService', function(UserMenuService) {
    return {
        templateUrl: 'user-menu/user-menu.tpl.html',
        restrict: 'E',

        controller: function($scope) {
            $scope.isPaired = false;
            $scope.tvData = {};
            $scope.pairData = {};
            
            this.dataReceived = function(data) {
                if (data.deviceData) {
                    console.log('Device Data');
                    $scope.isPaired = true;
                    $scope.pairData.avatar = 'https://github.com/identicons/jasonlong.png';
                    if (data.deviceData) {
                        $scope.pairData.avatar = data.deviceData.avatar + '&s=150';
                    }
                    $scope.pairData.ip = data.deviceData.clientIp;
                    $scope.pairData.uuid = data.deviceData.uuid;
                    $scope.pairData.github = data.deviceData.github; 
  
                } else {
                    console.log('no Device Data');
                }

                $scope.tvData.ip = data.clientIp;
                $scope.tvData.id = data.clientId;
                $scope.tvData.pairCode = data.pairCode;
            };

            UserMenuService.registerReceiver(this.dataReceived);

            UserMenuService.getClientData();
        }
    };
}])
.service('UserMenuService', ['$http', function($http) {

    var service = {};

    service.broadcastArray = [];

    service.registerReceiver = function(receiver) {
        service.broadcastArray.push(receiver);
    };

    // MessageService.registerReceivers({
    //     notify: function(data) {
    //         service.broadcastArray.forEach(function(receiver){
    //             console.log('User Menu: ', data);
    //             receiver(data);
    //         });
    //     },
    //     messageType: 'paired'
    // });

    service.getClientData = function() {
        console.log('polling for updates');

        return $http({
            method: 'GET',
            url: '/client-data'
        }).then(function successCallback(response) {
            console.log(response.data);

            service.broadcastArray.forEach(function(receiver){
                receiver(response.data);
            });

            return response.data;

        });
    };

    return service;
}]);