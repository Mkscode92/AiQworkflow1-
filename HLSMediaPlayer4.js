var HlsVideo;

document.addEventListener("DOMContentLoaded", () => {
    HlsVideo = document.getElementById("Dvideo");
    var HlsVideoSrc = "https://dfflvukqjg5l4.cloudfront.net/leo480p_no_audio.m3u8";
    const defaultOptions = {};

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(HlsVideoSrc);
        hls.attachMedia(HlsVideo);

        updateHls(hls)
    }
    function updateQuality(newQuality) {
        window.hls.levels.forEach((level, levelIndex) => {
            
            if(level.height === newQuality){
                window.hls.currentLevel = levelIndex
            }
        })
    }
    function updateHls(hls) {
        window.hls = hls
    }
})

