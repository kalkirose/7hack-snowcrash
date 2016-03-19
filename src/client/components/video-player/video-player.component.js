angular.module('7hack.videoPlayer', [])

.directive('videoPlayer', function() {
    return {
        templateUrl: 'video-player/video-player.tpl.html',
        restrict: 'E',

        controller: function() {
            jwplayer("player").setup({
                sources: [
                    {
                         // this works in the browser
                        file: "rtmp://10.100.105.175:1935/hubba/mp4:hurdles"
                    },
                    {
                         /* this works for TV*/
                        file: "http://10.100.105.175:1935/hubba/hurdles/playlist.m3u8"                      
                    },
                    {
                     /* mpeg dash cant get working */
                        file: "http://dash.edgesuite.net/dash264/TestCases/1a/netflix/exMPD_BIP_TC1.mpd"
                    } 
                ],
                rtmp: {bufferlength: 3}, 
                controls:false, 
                autostart: true,
                height: "100%",
                width: "100%"
            });
        }
    };
});