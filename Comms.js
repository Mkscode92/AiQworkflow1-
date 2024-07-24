let AddStream = document.getElementById("AddStream");
let RemoveStream = document.getElementById("RemoveStream");


let MediaBoxes = [
    document.getElementById("MainMediaBox"),
    document.getElementById("SidePlayer1"),
    document.getElementById("SidePlayer2"),
    document.getElementById("SidePlayer3")
]

const main = async(video) => {
    AddStream.addEventListener("click", () => {
        video = document.createElement("video");
        video.className = "Stream";
        MediaBoxes[0].append(video);
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
                video.srcObject = stream;
                video.play();
            });
        }
    })
    RemoveStream.addEventListener("click", () => {
        video.remove();
    })
}

main();
