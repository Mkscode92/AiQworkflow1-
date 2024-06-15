var Aplayer;
var BPlayer;
var CPlayer;
var Dplayer; 

var VIDEOID1 = "5RtR8GaW1dE";
var VIDEOID2 = "9yQa5zb7_3k";
var VIDEOID3 = "9yQa5zb7_3k";
var VIDEOID4 = "9yQa5zb7_3k";


function onYouTubeIframeAPIReady() {
    console.log("ready");

    APlayer = new YT.Player("MainMediaBox",{
        height: 500,
        width: 900,
        videoId: VIDEOID1,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:0
        }
    })
    BPlayer = new YT.Player("SidePlayer1",{
        height: 500,
        width: 500,
        videoId: VIDEOID2,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:1
        }
    })
    CPlayer = new YT.Player("SidePlayer2",{
        height: 500,
        width: 500,
        videoId: VIDEOID3,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:1
        }
    })
    Dplayer = new YT.Player("SidePlayer3",{
        height: 500,
        width: 500,
        videoId: VIDEOID4,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:1
        }
    })
}
