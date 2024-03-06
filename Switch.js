var buttons = document.getElementsByClassName("SideHlsPlayer");
var Screens = document.getElementsByClassName("Screen");
var GlowBox = document.getElementsByClassName("SideHlsPlayer");

var B1 = buttons[0];
var B2 = buttons[1];
var B3 = buttons[2];






B1.onclick = function(){

    SwitchAudio(0);
    /*
    var MainScreenBox = document.getElementById("AScreenBox");
    var SwapScreenBox = document.getElementById("BScreenBox");
    Screens  = document.getElementsByClassName("Screen");
    var Screen1 = Screens[0];
    var Screen2 = Screens[1];

    MainScreenBox.appendChild(Screen2);
    SwapScreenBox.appendChild(Screen1);

    SwitchControl(Screen2,Screen1);
    
    updateLabel()

    Screen1.pause();
    Screen2.pause();
    
    */
}
B2.onclick = function(){
    SwitchAudio(1);
    
    // GlowBox[0].style.backgroundColor = "rgb(0, 0, 0)";
    // GlowBox[1].style.backgroundColor = "rgb(121, 117, 117)";
    // GlowBox[2].style.backgroundColor = "rgb(0, 0, 0)";
    /*
    var MainScreenBox = document.getElementById("AScreenBox");
    var SwapScreenBox = document.getElementById("CScreenBox");
    Screens  = document.getElementsByClassName("Screen");
    var Screen1 = Screens[0];
    var Screen2 = Screens[2];

    MainScreenBox.appendChild(Screen2);
    SwapScreenBox.appendChild(Screen1);

    SwitchControl(Screen2,Screen1);
 
    updateLabel()
    Screen1.pause();
    Screen2.pause();
    */
}
B3.onclick = function(){

    SwitchAudio(2);

    // GlowBox[0].style.backgroundColor = "rgb(0, 0, 0)";
    // GlowBox[1].style.backgroundColor = "rgb(0, 0, 0)";
    // GlowBox[2].style.backgroundColor = "rgb(121, 117, 117)";
    /*
    var MainScreenBox = document.getElementById("AScreenBox");
    var SwapScreenBox = document.getElementById("DScreenBox");
    Screens  = document.getElementsByClassName("Screen");
    var Screen1 = Screens[0];
    var Screen2 = Screens[3];

    MainScreenBox.appendChild(Screen2);
    SwapScreenBox.appendChild(Screen1);

    SwitchControl(Screen2,Screen1);
    
    updateLabel()
    Screen1.pause();
    Screen2.pause();
    */
}

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
