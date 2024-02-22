var MainVideo = document.getElementById("Avideo");
var VideoB = document.getElementById("Bvideo");
var VideoC = document.getElementById("Cvideo");
var VideoD = document.getElementById("Dvideo");
var select = document.getElementById("select");

var EnglishTrack =  "audio/Leo1080p_English_with_CC.mp3"
var VietnameseTrack = "audio/4. Leo - Netflix - Vietnamese audio sound track.mp3"

var audio = new Howl({
    src: EnglishTrack
});

select.addEventListener("change", function() {
    audio.unload();

    audio = new Howl({
        src: select.value
    })

    audio.play()
})


MainVideo.addEventListener("play", function() {
    var MT = MainVideo.currentTime;

    VideoB.play();
    VideoC.play();
    VideoD.play();

    VideoB.volume = 0;
    VideoC.volume = 0;
    VideoD.volume = 0;

    audio.play()

    if (Math.abs(audio.currentTime - MT) > 0.1) {
        audio.currentTime = MT;
    }
})

MainVideo.addEventListener("pause", function() {
    VideoB.pause();
    VideoC.pause();
    VideoD.pause();

    audio.pause();
})


MainVideo.addEventListener("timeupdate", async function() {
    var MT = MainVideo.currentTime;

    if (Math.abs(VideoB.currentTime - MT) > 0.1) {
        VideoB.currentTime = MT;
    }
    if (Math.abs(VideoC.currentTime - MT) > 0.1) {
        VideoC.currentTime = MT;
    }
    if (Math.abs(VideoD.currentTime - MT) > 0.1) {
        VideoD.currentTime = MT;
    }

    if (Math.abs(VideoD.currentTime - MT) > 0.1) {
        VideoD.currentTime = MT;
    }

    if (Math.abs(audio.seek() - MT) > .2) {
        audio.seek(MT);
    }
    
})

