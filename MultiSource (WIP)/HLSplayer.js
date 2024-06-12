function AddAudio(AudioElement,player,Presets){ 
    var AudioOption = document.createElement("button");

    AudioOption.classList = "AudioOption";
    AudioOption.textContent = Presets.label;

    var DisplayHeight = String(10 * (player.textTracks().length + 1)) + "%";
    
    AudioOption.style.top = DisplayHeight;
    AudioElement.append(AudioOption);
    

}

function AddSubtitle(SubtitleElement,player,Presets) {

    var SubtitleOption = document.createElement("button");
    SubtitleOption.classList = "SubtitleOption";
    SubtitleOption.textContent = Presets.label;

    var DisplayHeight = String(10 * (player.textTracks().length + 1)) + "%";

    SubtitleOption.style.top = DisplayHeight;
    player.addRemoteTextTrack(Presets);
    SubtitleElement.append(SubtitleOption);

    SubtitleOption.addEventListener('click', function() {
        console.log("hi");
    })
}

function HLSVideo(ParentElement) {
    // Create a video element
    // Create a video element
    var video = document.createElement('video');
    var hls = new Hls();

    // Set styles
    video.style.height = "100%";
    video.style.width = "100%";
    video.className = "video-js";
    video.type = 'application/x-mpegURL';

    // Append the video element to the parent element first
    ParentElement.appendChild(video);

    // Then, initialize the video.js player with the video element
    var player = videojs(video, { controls: true });

    player.ready(function() {
        // Add a caption track
        var controlBar = player.controlBar;
        controlBar.removeChild('seekToLive');
        controlBar.removeChild('pictureInPictureToggle');

        var button = controlBar.getChild('subsCapsButton');
        var coverDiv = document.createElement('div');
        var ExitButton = document.createElement('button');
        var AudioList = document.createElement('div');
        var SubtitleList = document.createElement('div');

        coverDiv.classList = "LanguagePanel";
        ExitButton.classList = "exitButton";
        AudioList.classList = "AudioList";
        SubtitleList.classList = "SubtitleList";

        // Append the cover div to the video element
        ParentElement.append(coverDiv);
        coverDiv.append(ExitButton);
        coverDiv.append(AudioList);
        coverDiv.append(SubtitleList);

        // Add event listener to the button
        button.on('click', function() {
            // Toggle the visibility of the cover div when the button is clicked
            coverDiv.style.display = 'block';
            coverDiv.style.pointerEvents = 'all';
        });
        ExitButton.addEventListener('click', function() {
            coverDiv.style.display = 'none';
            coverDiv.style.pointerEvents = 'none';
        })

        AddAudio(AudioList, player, {
            label: 'English',
            src: '',
          })

        AddSubtitle( SubtitleList, player, {
            kind: 'captions',
            label: 'Off',
            src: ' '
        })

        AddSubtitle( SubtitleList, player, {
            kind: 'captions',
            label: 'English',
            language: 'en',
            src: 'languages/1. Leo - Netflix - Source English with CC.vtt',
            srclang: 'en'
        })


        console.log(player.textTracks().length);

    
        // Enable the captions track automatically
        
    });

    // Hls
    hls.loadSource("https://dfflvukqjg5l4.cloudfront.net/leo480p_no_audio.m3u8");
    hls.attachMedia(video);
    window.hls = hls;
}



// Call the HLSVideo function after the document is fully loaded
HLSVideo(document.getElementById("MainMediaBox"));