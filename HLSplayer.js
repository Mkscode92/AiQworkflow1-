const EnglLink = {
    VideoLink: "https://dfflvukqjg5l4.cloudfront.net/Leo1080p_English/Leo1080p_English_with_CC720pLeoEnglishModified.m3u8",
    SubtitleLink: "languages/English.vtt",
    label: 'English',
}; // English

const SpanLink = {
    VideoLink: "https://dfflvukqjg5l4.cloudfront.net/Leo1080p_Spanish/Leo1080p_Spanish - Made with Clipchamp720pLeoSpanishModified.m3u8",
    SubtitleLink: "languages/Spanish.vtt",
    label: 'Spanish',


};  //Spanish

const VietLink =  {
    VideoLink: "https://dfflvukqjg5l4.cloudfront.net/Leo1080p_Viet/LeoVietDubLeoVietnameseModified.m3u8",
    SubtitleLink: "languages/Vietnamese.vtt",
    label: 'Vietnamese',
};//Viet


function AddAudio(AudioElement,player,Presets){ 

    if (Presets.NetflixUI) {  //Allows for Netflix Caption UI, Turn on for Multisource, off for HLS
        var AudioOption = document.createElement("button");

        AudioOption.classList = "AudioOption";
        AudioOption.textContent = Presets.label;

        var DisplayHeight = String(15 * (AudioElement.childNodes.length + 1)) + "%";
        
        AudioOption.style.top = DisplayHeight;
        AudioElement.append(AudioOption);
    }

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

function HLSVideo(ParentElement,Source, NetflixUI) { //ParentNode , Source Array, if (Bool = false) NetflixUI = false
    // Create a video element
    var video;
    var hls = new Hls();

    if (ParentElement.nodeName == "VIDEO") {  // checks if element is a video otherwise creates video node
        video = ParentElement;
    } else {
        video = document.createElement("video");

        // Set styles
        video.className = "video-js";
        video.type = 'application/x-mpegURL';
        video.controls = true;
        video.playsInline = true;

        // Append the video element to the parent element first
        ParentElement.appendChild(video);
    }
    
    if (Hls.isSupported()) {
        if (NetflixUI) {
            // Then, initialize the video.js player with the video element
            const player = videojs(video, { controls: true, autoplay: true });
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

                video.addEventListener('play', function() {
                    
                    console.log("hi");
                })

                ExitButton.textContent = "X";

                AddSubtitle(SubtitleList, player, {
                    kind: 'captions',
                    label: 'Off',
                    src: ''
                })

                for (let i = 0; i < Source.length; i++) {
                    AddAudio(AudioList, player, {
                        label: Source[i].label,
                        src: Source[i].VideoLink,
                        NetflixUI: true
                    })
                    
                    AddSubtitle(SubtitleList, player, {
                        kind: 'captions',
                        label: Source[i].label,
                        src: Source[i].SubtitleLink,
                        NetflixUI: true
                    })
                }
            });
            
        };
    
    };
    // Hls

    hls.loadSource(Source[0].VideoLink);
    hls.attachMedia(video);
    window.hls = hls;

    return video;
}