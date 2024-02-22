document.addEventListener("DOMContentLoaded", () => {
    var HlsVideo = document.getElementById("Cvideo");
    var HlsVideoSrc = "assets/Master.m3u8";
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