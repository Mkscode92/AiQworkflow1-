const EnglLink = "https://dfflvukqjg5l4.cloudfront.net/Leo1080p_English/Leo1080p_English_with_CCLeoEnglishMod.m3u8" // English
const SpanLink = "https://dfflvukqjg5l4.cloudfront.net/Leo1080p_Spanish/Leo1080p_Spanish - Made with ClipchampLeoSpanishModified.m3u8" //Spanish
const VietLink = "https://dfflvukqjg5l4.cloudfront.net/Leo1080p_Viet/LeoVietDubLeoVietModified.m3u8" //Viet

function AddAudio(AudioElement,player,Presets){ 

    var AudioOption = document.createElement("button");


    AudioOption.classList = "AudioOption";
    AudioOption.textContent = Presets.label;

    var DisplayHeight = String(15 * (AudioElement.childNodes.length + 1)) + "%";
    
    AudioOption.style.top = DisplayHeight;
    AudioElement.append(AudioOption);

    AudioOption.addEventListener('click', function() {
        var TimeStamp = player.currentTime();
        hls.loadSource(Presets.src);
        player.currentTime(TimeStamp);
        player.play();
    }) 
    
}

function AddSubtitle(SubtitleElement,player,Presets) {

    var SubtitleOption = document.createElement("button");
    SubtitleOption.classList = "SubtitleOption";
    SubtitleOption.textContent = Presets.label;

    let index = player.textTracks().length;

    var DisplayHeight = String(15 * (index + 1)) + "%";
    SubtitleOption.style.top = DisplayHeight;
    SubtitleElement.append(SubtitleOption);

    player.addRemoteTextTrack(Presets);



    SubtitleOption.addEventListener('click', function() {
        for (let i = 0; i < player.textTracks().length; i++) {
            player.textTracks()[i].mode = 'hidden';
        }
        player.textTracks()[index].mode = 'showing';
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
        ExitButton.textContent = "X";



        AddAudio(AudioList, player, {
            label: 'English',
            src: EnglLink,
          })

        AddAudio(AudioList, player, {
            label: 'Spanish',
            src: SpanLink,
          })

        AddAudio(AudioList, player, {
            label: 'Vietnamese',
            src: VietLink,
          })

          

        AddSubtitle(SubtitleList, player, {
            kind: 'captions',
            label: 'Off',
            src: ''
        })

        AddSubtitle(SubtitleList, player, {
            kind: 'captions',
            label: 'English',
            src: 'languages/English.vtt'
        })

        AddSubtitle(SubtitleList, player, {
            kind: 'captions',
            label: 'Spanish',
            src: 'languages/Spanish.vtt'
        })

        AddSubtitle(SubtitleList, player, {
            kind: 'captions',
            label: 'Vietnamese',
            src: 'languages/Vietnamese.vtt'
        })



    
        // Enable the captions track automatically
        
    });

    // Hls
    hls.loadSource(EnglLink);
    hls.attachMedia(video);
    window.hls = hls;

}



// Call the HLSVideo function after the document is fully loaded
HLSVideo(document.getElementById("MainMediaBox"));