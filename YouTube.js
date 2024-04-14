var Aplayer;
var BPlayer;
var CPlayer;
var Dplayer; 

var VIDEOID = "VqkSBRtdK7M";

function onYouTubeIframeAPIReady() {
    console.log("ready");

    APlayer = new YT.Player("MainMediaBox",{
        height: 500,
        width: 900,
        videoId: VIDEOID,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:1
        }
    })
    BPlayer = new YT.Player("SidePlayer1",{
        height: 500,
        width: 500,
        videoId: VIDEOID,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:1
        }
    })
    CPlayer = new YT.Player("SidePlayer2",{
        height: 500,
        width: 500,
        videoId: VIDEOID,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:1
        }
    })
    Dplayer = new YT.Player("SidePlayer3",{
        height: 500,
        width: 500,
        videoId: VIDEOID,
        playerVars: {
            playersinline:1,
            autoplay:1,
            controls:1
        }
    })
}
