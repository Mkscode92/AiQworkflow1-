const MediaBox = document.getElementById("MainMediaBox");
let checks = true;

document.addEventListener('DOMContentLoaded', () => {
  let plyr1 = plyrSetup(quickID('player'), "https://youtu.be/tPWioxKVNe4?si=jzFw0GBHQMJ6wp-A", {debug: true});
  let plyr2 = plyrSetup(quickID('SidePlayer1'), "https://www.youtube.com/watch?v=sf7TC0poGlg", {debug: true});
  let plyr3 = plyrSetup(quickID('SidePlayer2'), "https://www.youtube.com/watch?v=SlBOpNLFUC0&list=LL&index=1", {debug: true});
  let plyr4 = plyrSetup(quickID('SidePlayer3'), "https://www.youtube.com/watch?v=JptJwJ0Kjgg", {debug: true});
});

//var link = "https://www.youtube.com/embed/eI4an8aSsgw";
//let vidLink = "https://youtu.be/ErTef06r0R0?si=2KKESTwhoy0QR4rl";         //all three types of YT links
//let vidLink = "https://www.youtube.com/watch?v=SlBOpNLFUC0&list=LL&index=1";


const vidIDGrabber = (link) => {
  let videoID = "";

  if (typeof link !== "string"){
    console.log(`Inputted link was not a String, instead was a ${typeof link}`);
    return;
  }

  const check1 = link.indexOf("?v=");
  const check2 = link.indexOf("?si=");
  const check3 = link.indexOf("/embed/");
  let start, end;

  switch (true){
    case (check1 > 11 && !(check3 > 11)):   // Regular YT link check.
      videoID = link.substring(check1 + 3);
      break;
    case (check2 > 11):                     // YT share link check (have to add cutoff in case "start at #" checkbox is clicked).
      start = link.indexOf(".be/") + 4;
      end = check2;
      videoID = link.substring(start, end);
      break;
    case (check3 > 11 && check1 > 11):      // YT embed link check in case kenneth decides to use one again.
      start = check3 + 7;
      end = check1;
      videoID = link.substring(start, end);
      break;
    case (check3 > 11):                     // YT embed link check in case kenneth decides to use one again.
      start = check3 + 7;
      videoID = link.substring(start);
      break;
    default:                                // Just a regular Error message.
      console.log(`Youtube link not recognized, ${check1}, ${check2}, ${check3}`);
      return;
  }
  return videoID;
}

const plyrSetup = (idOrSelector = '#player', vidSrc = 'https://youtu.be/tPWioxKVNe4?si=jzFw0GBHQMJ6wp-A', vidSettings = {}) => {
  typeCheck(idOrSelector, 'string', 'object');
  typeCheck(vidSrc, 'string');
  typeCheck(vidSettings, 'object');
  
  if (!checks){
    console.log(`Incorrect variable type`);
    checks = true;
    return;
  }

  let iframeRoot = (typeof idOrSelector == 'string') ? document.querySelector(idOrSelector) : idOrSelector;
  let iframe = iframeRoot.getElementsByClassName('youtube_Iframe')[0];
  iframe.src = vidSrc
  
  let player = new Plyr(idOrSelector, vidSettings);
  return player;
}

const typeCheck = (variable, expectedType, expectedType2) => {
  // "object" "undefined" "boolean"	"number" "string"	
  if ((typeof variable == expectedType || typeof variable == expectedType2) && checks == true){
    checks = true;
    return;
  }
  console.log(`Expected ${expectedType}, Instead got ${variable}`);
  checks = false;
}

const quickID = (idName) => {
  return document.getElementById(idName); // I got tired ok.
}
//document.addEventListener("mousemove", (event) => {console.log(`x: ${event.clientX} y: ${event.clientY}`)});
