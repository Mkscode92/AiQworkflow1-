var MainVideo = document.getElementById("Avideo");
var VideoB = document.getElementById("Bvideo");
var VideoC = document.getElementById("Cvideo");
var VideoD = document.getElementById("Dvideo");
var select = document.getElementById("select");


// var EnglishSrc =  "audio/Leo1080p_English_with_CC.mp3"
// var VietnameseSrc = "audio/4. Leo - Netflix - Vietnamese audio sound track.mp3"
// var SpanishSrc = "audio/7. Leo - Netflix - Spanish audio sound track.wav"

// var EnglishAudio = new Howl({
//     src: EnglishSrc
// });
// var SpanishAudio = new Howl({
//     src: SpanishSrc
// })
// var VietnameseAudio = new Howl({
//     src: VietnameseSrc
// })
// var audiolist = [EnglishAudio,SpanishAudio,VietnameseAudio]

// var audio = EnglishAudio
// console.log(audio);

// select.addEventListener("change", function() {
//     audio.pause();
//     audio = audiolist[select.value]
    
//     audio.play();
// })


// MainVideo.addEventListener("play", function() {

//     VideoB.play();
//     VideoC.play();
//     VideoD.play();
// })

// MainVideo.addEventListener("pause", function() {
//     VideoB.pause();
//     VideoC.pause();
//     VideoD.pause();
// })


// MainVideo.addEventListener("seeked", async function() {
//     var MT = MainVideo.currentTime;
//     VideoB.currentTime = MT;
//     VideoC.currentTime = MT;
//     VideoD.currentTime = MT;
// })

// MainVideo.addEventListener("timeupdate",() => {
//     if (Math.abs(MainVideo.currentTime - audio.seek())) {
//         audio.seek(MainVideo.currentTime);
//     }
// })

// var tag = document.getElementById("debugger");
// MainVideo.addEventListener("waiting", function() {
//     tag.textContent = "waiting";
// })
// MainVideo.addEventListener("playing", function() {
//     tag.textContent = "playing";
// })



// var observer = new MutationObserver(function() {
//     for (i = 0; i < GlobalAudio.length; i++) {
//         GlobalAudio[i].unload();
//     }
    
    

//     Player = document.getElementsByClassName("Screen");



//     addAction(Player, Player[0].getElementsByTagName('audio'))
    

// });

// addAction(Player,audElem)

// function addAction(Screen,inAudio) { 
//     MainVideo = Screen[0];
    
//     Array.from(inAudio).forEach(function(AudioSrc, index) {
//         GlobalAudio[index] = new Howl({
//             src: [AudioSrc.src],
//             volume: (AudioSrc.volume) - (0.6 * index)
//         })
//     })

//     MainVideo.addEventListener('play', function playAudio() {
//         if (MainVideo.parentNode == "AScreenBox") {
//             GlobalAudio.forEach(function(eachAudio) {
//                 eachAudio.play();
//             })
//         }
//     })
//     MainVideo.addEventListener('pause', function pauseAudio() {
//         if (MainVideo.parentNode == "AScreenBox") {
//             GlobalAudio.forEach(function(eachAudio) {
//                 eachAudio.pause()
//             })
//         }
//     })

// }


// observer.observe(MainScreenBox, {childList: true});
