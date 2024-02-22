document.addEventListener("DOMContentLoaded", () => {
    var HlsVideo = document.getElementById("Avideo");
    
    var HlsVideoSrc = "assets/leo1080p_english_with_cc.m3u8";
    const defaultOptions = {};

    try {
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(HlsVideoSrc);
    
            HlsVideo.controlsList = "noplaybackrate";
            HlsVideo.disablePictureInPicture = true;
    
            hls.attachMedia(HlsVideo);
    
            updateHls(hls)
    
            /*
            hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
                const availableQualities = hls.levels.map((l) => l.height)
    
                defaultOptions.controls = 
                [
                    'play-large', 
                    'restart', 
                    'rewind', 
                    'play', 
                    'fast-forward', 
                    'progress',
                    'current-time', 
                    'duration', 
                    'mute', 
                    'volume', 
                    'captions', 
                    'settings', 
                    'pip', 
                    'fullscreen', 
                ];
    
         
                defaultOptions.quality = {
                    default: availableQualities[0],
                    options: availableQualities,
                    forced: true,
                    onChange: (e) => {
                        updateHls(hls)
                        updateQuality(e);
    
                    }
                }
    
                defaultOptions.Audio = {
                    options: ["English", "Vietnamese", "Spanish"]
                    
                }
                
                //const plyr1 = new Plyr(HlsVideo, defaultOptions);
            });*/
    
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