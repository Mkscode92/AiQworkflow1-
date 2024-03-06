document.addEventListener("DOMContentLoaded", () => {
    var HlsVideo = document.getElementById("Avideo");
    var Source = "https://dfflvukqjg5l4.cloudfront.net/leo480p_no_audio.m3u8";
    const defaultOptions = {};

    try {
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(Source);
    
            HlsVideo.controlsList = "noplaybackrate";
            HlsVideo.disablePictureInPicture = true;
    
            hls.attachMedia(HlsVideo);
    
            updateHls(hls)
    
            

        }
    } catch (error) {
        window.alert(error);
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
