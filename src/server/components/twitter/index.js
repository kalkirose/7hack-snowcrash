var Twit = require('twit')

var T = new Twit({
  consumer_key:         'RoZhuQmLM3b8iBBpvYH9rTngQ',
  consumer_secret:      'MgdCbfHw0Vryp6Tr1QDByzySSopqQP501v5h925sWuiiJPZRLc',
  app_only_auth:        true,
  timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
})


var twitterModule = {
    getFeed: function(callback) {
        T.get('search/tweets', { q: '#7hack', count: 10 }, function(err, data, response) {
            if (err) {
                callback(err);
            }  

            var dataArray = data.statuses.map(function(status) {
                return {
                    img: status.user.profile_image_url,
                    handle: '@' + status.user.screen_name,
                    message: status.text,
                    time: status.created_at
                }
            });

            callback(null, dataArray);
        });
    }
}

module.exports = twitterModule;