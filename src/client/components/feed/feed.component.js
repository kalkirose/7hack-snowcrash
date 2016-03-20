angular.module('7hack.feed', [])

.directive('feed', ['FeedService', 'InteractionService', '$http', '$timeout', function(FeedService, InteractionService, $http, $timeout) {
    return {
        templateUrl: 'feed/feed.tpl.html',
        restrict: 'E',

        controller: function($scope) {
            this.twitterEnabled = FeedService.showFeed;
            $scope.twitterEnabled = this.twitterEnabled; 
            this.tweetHidden = true;
            $scope.currentTweet = {};
            $scope.feedType = 'sportradar';
            $scope.sportEnabled = false;
            
            var self = this;

            this.cronSports = function() {
                 $timeout(function() {
                    self.startSportsFeed();
                }, 5000);
            };

            this.startSportsFeed = function() {
                if ($scope.sportsData.length) {
                   $scope.currentSport = $scope.sportsData.pop();
                   $scope.feedType = 'sportradar';
                   $scope.sportEnabled = true;
                   self.cronSports();
                } else {
                    $scope.sportEnabled = false;
                    $scope.feedType = 'twitter';
                }
            };

            $scope.sportsData = [];

            // console.log('Making Get');
            $http({
                method: 'GET',
                url: '/sportradar'
            }).then(function successCallback(response) {
                if (response) {
                    console.log('Sport Data', response);
                    $scope.sportsData = response.data;
                }
            });


            var receiver = {
                notify: function(key, data) {
                    if (key === 80) {
                        console.log('Toggleing Feed');
                        self.toggleEnabled(!$scope.twitterEnabled);
                        //$scope.$apply();
                    }
                },
                keys: [80]
            };

            InteractionService.registerReceiver(receiver);

            var receiver2 = {
                notify: function(key, data) {
                    if (key === 75) {
                        console.log('Start Feed');
                        self.startSportsFeed();
                        //$scope.$apply();
                    }
                },
                keys: [75]
            };

            InteractionService.registerReceiver(receiver2);

            var receiver3 = {
                notify: function(key, data) {
                    if (key === 73) {
                        if ($scope.sportsData.length) {
                            $scope.feedType = 'sportradar';
                        } else {
                            $scope.feedType = 'twitter';    
                        }
                        //$scope.$apply();
                    }

                    if (key === 79) {
                        $scope.feedType = 'twitter';
                    }
                },
                keys: [73,79]
            };

            InteractionService.registerReceiver(receiver3);


            this.makeTweet = function(tweet) {
                if ( tweet ) {
                    var fontSize = '20px';
                    
                    if (tweet.message.length >= 130) {
                        fontSize = '16px';
                    } else if (tweet.message.length >= 115) {
                        fontSize = '17px';
                    }

                    $scope.currentTweet.fontSize = fontSize;

                    var message = tweet.message.replace(/(#[^\s]+)/gi, function myFunction(x, group1){ 
                        return '<span class="twitter_hashtag">' + group1 + '</span>';
                    });

                    message = '<span id="twitter-message-content">' + message.replace(/(@[^\s]+)/gi, function myFunction(x, group1){ 
                        return '<span class="twitter_atsymbol">' + group1 + '</span>';
                    }) + '</span>';

                    if ($('#twitter-message-content').length) {
                        $('#twitter-message-content').remove();
                    }

                    tweet.time = moment(tweet.time).fromNow();

                    var messeageElement = angular.element(message);

                    $('.twitter_message').append(messeageElement);

                    $scope.currentTweet.message = message;
                    $scope.currentTweet.tweet = tweet;
                }
            };

            this.toggleEnabled = function(enabled) {
                console.log('Toggleing Tweets: ', enabled);
                self.twitterEnabled = enabled;
                $scope.twitterEnabled = enabled;
                self.cycleTweets();
            };

            FeedService.registerReceiver(this.toggleEnabled);

            this.queueTwitterTimer = function() {
                setTimeout(function() {
                    self.cycleTweets();
                }, 3000);
            };

            this.showTweet = function() {
                console.log('show tweet');
                self.tweetHidden = true;
                $('#twitter_tweet').css('opacity', 0).slideDown('slow').animate(
                    { opacity: 1 }, { queue: false, duration: 'slow' }
                );
                self.queueTwitterTimer();
            };

            this.hideTweet = function() {
                console.log('hide tweet');
                self.tweetHidden = false;
                $('#twitter_tweet').css('opacity', 1).slideDown('slow').animate(
                    { opacity: 0 }, { queue: false, duration: 'slow' }
                );
                self.queueTwitterTimer();
            };

            this.cycleTweets = function() {
                console.log('Cycling Tweets');

                FeedService.getNextTweet().then(function(tweet) {
                    self.makeTweet(tweet);
                    if (self.twitterEnabled) {
                        if (self.tweetHidden) {
                            self.showTweet();
                        } else {
                            self.hideTweet();
                        }
                    }
                });
            };

            //Remove after testing
            this.cycleTweets();
        }
    };
}])

.service('FeedService', ['$http', '$q', function($http, $q) {
    var service = {};

    service.showFeed = false;

    service.broadcastArray = [];
    service.tweetArray = [];

    service.registerReceiver = function(receiver) {
        service.broadcastArray.push(receiver);        
    };

    service.toggleFeed = function() {
        service.showFeed = !service.showFeed;

        console.log('New Show Feed: ', service.showFeed);

        service.broadcastArray.forEach(function(receiver){
            receiver(service.showFeed);
        });
    };

    service.getNextTweet = function() {
        if (service.tweetArray.length) {
            var deferred = $q.defer();
            deferred.resolve(service.tweetArray.pop());
            return deferred.promise;
        } else {
            return service.getNewFeed();
        }
    };

    service.getNewFeed = function() {
        console.log('Get Feed');
        // Simple GET request example:
        return $http({
            method: 'GET',
            url: '/twitter-feed'
        }).then(function successCallback(response) {
            console.log(response.data);
            service.tweetArray = response.data;
            return service.tweetArray.pop();
        }, function errorCallback(response) {
            console.log('Error ', response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };



    return service;
}]);