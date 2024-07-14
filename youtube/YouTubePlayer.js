const MediaBox = document.getElementById("MainMediaBox");
const defaultSettings = {debug: 'true', ratio:'16:9'};
let checks = true;
let allPlyrs = [];
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
      return false;
  }
  return videoID;
}

const plyrSetup = (idOrSelector = '#player', vidSrc = 'https://youtu.be/tPWioxKVNe4?si=jzFw0GBHQMJ6wp-A', vidSettings = {}) => {
  typeCheck(idOrSelector, 'string', 'object'); // See typeCheck's function definition to see how it works 
  typeCheck(vidSrc, 'string');
  typeCheck(vidSettings, 'object');
  iframeCheck(idOrSelector); //     Checks if an iframe exists, if not, creates one where it's supposed to be.
  
  if (!checks){ // if typeCheck sets off as false then function won't run. 
    console.log(`Incorrect variable type`);
    checks = true;
    return;
  }

  let iframeRoot = (typeof idOrSelector == 'string') ? document.querySelector(idOrSelector) : idOrSelector; // quick ternary operator that changes depending on whether a selector or element is inputted
  let iframe = iframeRoot.getElementsByClassName('youtube_Iframe')[0];
  iframe.src = vidSrc;
  
  let info = {
    plyr: new Plyr(idOrSelector, vidSettings), // video player settings are the same as Plyr's settings,
    vidIframe: iframe,
    inputElement: "Nuthin"
  };
  return info;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

const iframeCheck = (idOrSelector) => {
  let iframeRoot = (typeof idOrSelector == 'string') ? document.querySelector(idOrSelector) : idOrSelector;
  let iframe = iframeRoot.querySelector('iframe');
  if (!iframe){
    let newIframe = document.createElement('iframe');
    newIframe.className = 'youtube_Iframe';
    iframeRoot.append(newIframe);
    console.log("Iframe didn't exist, but now exists");
  }
}

const typeCheck = (variable, expectedType, expectedType2) => {
  // "object" "undefined" "boolean"	"number" "string"	
  if ((typeof variable == expectedType || typeof variable == expectedType2) && checks == true){
    checks = true; 
    return;
  }
  console.log(`Expected ${expectedType}, Instead got ${variable}`);
  // if any check fails then it globally puts the check variable as false which allows multiple checks easily, 
  //  similar to those tilt sensors some packages have.
  checks = false; 
}

const quickID = (idName) => {
  return document.getElementById(idName); // I got tired ok.
}

const plyrInputLinker = (plyrObj, inputElement) => {
  inputElement.addEventListener("change", () => {
    //console.log(inputElement.value);
    let vidId = vidIDGrabber(inputElement.value); 
    if (!vidId){return}

    plyrObj.plyr.source = {
      type: 'video',
      sources: [
        {
          src: vidId,
          provider: 'youtube',
        },
      ],
    };
  });
  plyrObj.inputElement = inputElement;
}

const showInput = (plyrObj) => {
  let inputElement = plyrObj.inputElement;
  let classList = inputElement.classList;

  inputElement.classList.add('inputDropAnim');
  classList.contains('inputDropAnim_reversed') ? inputElement.classList.remove('inputDropAnim_reversed') : "";

  inputElement.addEventListener('animationend', () => {
    inputElement.classList.remove('inputDropAnim');
  });
  console.log('paused');
}

const hideInput = (plyrObj) => {
  let inputElement = plyrObj.inputElement;
  let classList = inputElement.classList;

  inputElement.classList.add('inputDropAnim_reversed');
  classList.contains('inputDropAnim') ? inputElement.classList.remove('inputDropAnim') : "";

  console.log('playing');
}

const hideSideBar = () => {
  let sideBar = quickID('sideBar');
  sideBar.classList.add('sideBarClosing');
  sideBar.classList.contains('sideBarOpening') ? sideBar.classList.remove('sideBarOpening') : "";
  
  quickID('sideOpenBtn').disabled = true;
  sideBar.addEventListener('animationend', () => {quickID('sideOpenBtn').disabled = false;});
}

const showSideBar = () => {
  let sideBar = quickID('sideBar');
  if (sideBar.classList.contains('sideBarOpening')){
    hideSideBar();
    return;
  }
  sideBar.classList.add('sideBarOpening');
  sideBar.classList.contains('sideBarClosing') ? sideBar.classList.remove('sideBarClosing') : "";
  
  quickID('sideOpenBtn').disabled = true;
  sideBar.addEventListener('animationend', () => {quickID('sideOpenBtn').disabled = false;});
}

const divOutliner = () => {
  let all = document.getElementsByTagName("*");
  console.log(all.length);
  for (let m=0; m < all.length; m++) {
    let randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    all[m].style.outline = `1px solid ${randomColor}`
  }
}

document.addEventListener('DOMContentLoaded', () => {
//      Every player should always be wrapped in a DOMContentLoaded 
//     listener, if not then it might run before page is even loaded which
//    means causes code to try to find an element that doesn't yet exist.
  //window.scrollTo(0, quickID('top').clientHeight);
  window.scrollTo(0, 0);
  
  let plyr1 = plyrSetup(quickID('MainMediaBox'), "https://youtu.be/tPWioxKVNe4?si=jzFw0GBHQMJ6wp-A", defaultSettings);
  let plyr2 = plyrSetup(quickID('SidePlayer1'), "https://www.youtube.com/watch?v=-oyqNzNxLhk", defaultSettings);
  let plyr3 = plyrSetup(quickID('SidePlayer2'), "https://www.youtube.com/watch?v=K74l26pE4YA", defaultSettings);
  let plyr4 = plyrSetup(quickID('SidePlayer3'), "https://www.youtube.com/watch?v=Fjp2TdlTTIU", defaultSettings);
  //divOutliner();
  let allInputs = document.querySelectorAll(".videoLinkInput");
  allInputs.forEach((input) => {input.value = "";});

  plyrInputLinker(plyr1, quickID("vidInput1"));
  plyrInputLinker(plyr2, quickID("vidInput2"));
  plyrInputLinker(plyr3, quickID("vidInput3"));
  plyrInputLinker(plyr4, quickID("vidInput4"));

  plyr1.plyr.on("play", () => {hideInput(plyr1)});
  plyr2.plyr.on("play", () => {hideInput(plyr2)});
  plyr3.plyr.on("play", () => {hideInput(plyr3)});
  plyr4.plyr.on("play", () => {hideInput(plyr4)});

  plyr1.plyr.on("pause", () => {showInput(plyr1)});
  plyr2.plyr.on("pause", () => {showInput(plyr2)});
  plyr3.plyr.on("pause", () => {showInput(plyr3)});
  plyr4.plyr.on("pause", () => {showInput(plyr4)});

  quickID('sideOpenBtn').addEventListener('click', showSideBar);
  quickID('sideCloseBtn').addEventListener('click', hideSideBar);
});