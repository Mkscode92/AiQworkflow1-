var buttons = document.getElementsByClassName("SideHlsPlayer");
var Screens = document.getElementsByClassName("Screen");
var GlowBox = document.getElementsByClassName("SideHlsPlayer");

var select = document.getElementById('select');
select.addEventListener('change', function() {
    var index = select.value;
    SwitchAudio(index);
})


function SwitchControl(MainScreen,SwapScreen) {
    MainScreen.controls = true;
    SwapScreen.controls = false;

    SwapScreen.play();
}

function updateLabel(index){
    var LanguageOrder = [
        "English", 
        "Vietnamese",
        "Español"
    ];

    var getLabel = document.getElementsByClassName('Label');
    var CurrentLabel = getLabel[0];

    CurrentLabel.textContent = LanguageOrder[index];
}


var AudioTable = [
    new Howl({
        src: "https://dfflvukqjg5l4.cloudfront.net/Leo1080p_English_with_CC.mp3"
    }),
    new Howl({
        src: "https://dfflvukqjg5l4.cloudfront.net/4.%20Leo%20-%20Netflix%20-%20Vietnamese%20audio%20sound%20track.mp3"
    }),
    new Howl({
        src: "https://dfflvukqjg5l4.cloudfront.net/7.%20Leo%20-%20Netflix%20-%20Spanish%20audio%20sound%20track.wav"
    })
]
var CurrentAudio = AudioTable[0];

SwitchAudio(0);

var test

function SwitchAudio(value) {

    var Tracks = MainVideo.getElementsByTagName('track');

    Tracks[0].track.mode = 'hidden';
    Tracks[1].track.mode = 'hidden';
    Tracks[2].track.mode = 'hidden';

    

    GlowBox[0].style.border = "0px solid black";
    GlowBox[1].style.border = "0px solid black";
    GlowBox[2].style.border = "0px solid black";

    GlowBox[value].style.border = "5px solid rgb(121, 117, 117)";

    Tracks[value].track.mode = 'showing';

    updateLabel(value);

    CurrentAudio.pause(); 
    CurrentAudio = AudioTable[value];


    if (!MainVideo.paused) CurrentAudio.play();
}

var MainVideo = document.getElementById("Avideo");

MainVideo.addEventListener('play', function() {
    CurrentAudio.play();

    VideoB.play();
    VideoC.play();
    VideoD.play();
})

MainVideo.addEventListener('pause', function() {
    CurrentAudio.pause();

    VideoB.pause();
    VideoC.pause();
    VideoD.pause();
})

MainVideo.addEventListener("seeked", async function() {
    var MT = MainVideo.currentTime;
    VideoB.currentTime = MT;
    VideoC.currentTime = MT;
    VideoD.currentTime = MT;
})
    
MainVideo.addEventListener('timeupdate', function() {
    CurrentAudio.seek(MainVideo.currentTime);
})