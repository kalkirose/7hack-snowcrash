angular.module('7hack-snowcrash', [
    '7hack-snowcrash.templatesApp',
    '7hack.userMenu',
    '7hack.overlay',
    '7hack.interaction'
])

.controller( 'AppCtrl', ['$window', '$http', function($window, $http) {
    
}]);

// Bootstrap Angular with Sever Config
angular.element(document).ready(function () {
    angular.bootstrap(document, ['7hack-snowcrash']);
});
