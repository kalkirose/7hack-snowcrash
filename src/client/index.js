angular.module('7hack-snowcrash', [
    '7hack-snowcrash.templatesApp',
    '7hack.userMenu',
    '7hack.overlay',
    '7hack.interaction',
    '7hack.events',
    '7hack.livePhone',
    '7hack.videoPlayer',
    '7hack.alert',
    '7hack.events'
])

.controller( 'AppCtrl', ['$window', '$http', 'EventService', function($window, $http, EventService) {
    EventService.cron();
}]);

// Bootstrap Angular with Sever Config
angular.element(document).ready(function () {
    angular.bootstrap(document, ['7hack-snowcrash']);
});
