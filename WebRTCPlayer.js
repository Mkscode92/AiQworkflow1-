let accID = "Ww6rEz";
let streamName = "TViP4_VTV1.live"                   


const tokenGenerator = () => 
    window.millicast.Director.getSubscriber({
        streamName: streamName,
        streamAccountId: accID
    });
    
const millicastView = new window.millicast.View(streamName, tokenGenerator); // creates millicast which takes in stream name and token

const activeSources = new Set();
const sourceIdTransceiversMap = new Map();

millicastView.on("broadcastEvent", (event) => { // listener; turns on whenever a stream is live
    
    const { name, data } = event;

    switch (name) {
        case "active":
            activeSources.add(data.sourceId);
            addStreamToYourVideoTag(data.sourceId);
            break;
        case "inactive":
            activeSources.delete(data.sourceId);
            RemoveVideo(data.sourceId);
            
            break;
    }
    
});

const addStreamToYourVideoTag = async (sourceId) => { 
    const mediaStream = new MediaStream();
    const videoTransceiver = await millicastView.addRemoteTrack("video", [mediaStream]);
    const audioTransceiver = await millicastView.addRemoteTrack("audio", [mediaStream]);

    sourceIdTransceiversMap.set(sourceId, {
        videoMediaId: videoTransceiver.mid,
        audioMediaId: audioTransceiver.mid,
    });

    createVideoElement(mediaStream, sourceId);
    
    await millicastView.project(sourceId, [
        {
            trackId: "video",
            mediaId: videoTransceiver.mid,
            media: "video",
        },
        {
            trackId: "audio",
            mediaId: audioTransceiver.mid,
            media: "audio",
        },
    ]);

    
}

const RemoveVideo = async (sourceId) => {
    const video = document.getElementById(sourceId);
    const sourceTransceivers = sourceIdTransceiversMap.get(sourceId);

    sourceIdTransceiversMap.delete(sourceId);
    await millicastView.unproject([sourceTransceivers.videoMediaId, sourceTransceivers.audioMediaId]);

    document.getElementById(sourceId).remove();
}

const createVideoElement = (mediaStream, sourceId) => {


    const MainMediaBox = document.getElementById("MainMediaBox");
    const Sp1 = document.getElementById("SidePlayer1"); 
    const Sp2 = document.getElementById("SidePlayer2"); 
    const Sp3 = document.getElementById("SidePlayer3"); 

    const video = document.createElement("video");

    

    video.id = sourceId;
    video.srcObject = mediaStream;
    video.autoplay = true;
    
    video.style.width = "69%";
    video.style.height = "90%";

    video.style.position = "absolute";

    if (MainMediaBox.children.length == 1) {
        video.controls = true;
        MainMediaBox.appendChild(video);
    } else if  (Sp1.children.length == 0 ) {
        Sp1.appendChild(video);
        video.style.position = "relative";
        video.style.width = "100%";
        video.style.height = "90%";
    } else if  (Sp2.children.length == 0 ) {
        Sp2.appendChild(video);
        video.style.width = "100%";
        video.style.height = "100%";
    } else if  (Sp1.children.length == 0 ) {
        Sp3.appendChild(video);
        video.style.width = "100%";
        video.style.height = "100%";
    }

}

try {
    millicastView.connect();
} catch (e) {
    millicastView.reconnect();
}