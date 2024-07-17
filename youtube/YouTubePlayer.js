const MediaBox = document.getElementById("MainMediaBox");
const defaultSettings = {debug: 'false', ratio:'16:9'};
let checks = true;
let allPlyrs = [];
let dragEvent = false;
let img = document.createElement('img');
let players = [];

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
    if (inputElement.value.includes("delete")){plyrObj.inputElement.parentElement.remove()}

    let vidId = vidIDGrabber(inputElement.value); 
    if (!vidId){
      let cache = inputElement.style.color; // Very primitive bad link response, WILL CHANGE LATER.
      inputElement.style.color = 'red';
      setTimeout(() => {inputElement.style.color = cache}, 1000);
      return;
    }

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
  sideBar.addEventListener('animationend', () => {
    quickID('sideOpenBtn').disabled = false;
    if (sideBar.classList.contains('sideBarOpening')){
      sideBar.style.overflow = 'visible';
    }
  });
}

const firefoxClientPos = () => {
  if (!dragEvent){
    window.addEventListener('dragover', (e) => {
      dragEvent = e;
    });
  }
}

const dragListener = () => { // Weird way for firefox
  let allBoxes = document.querySelectorAll('.emptyPlyrBox');
  let dropZones = document.querySelectorAll('.editableRow');
  allBoxes.forEach((box) => { boxDrag(box); });
  /*
  dropZones.forEach((zone) => {
    zone.addEventListener('dragover', (e) => {
      console.log('DRAGGED OVER');
      e.preventDefault();
      row.classList.add('shadowGlow');
    });
  });
  */
}

const boxDrag = (box) => {
  let editableRows = document.querySelectorAll('.editableRow');
  let mouseX, mouseY;

  box.addEventListener('dragstart', (e) => {
    box.classList.add('dragging');
    e.dataTransfer.setDragImage(img, 0, 0);
    editableRows.forEach((row) => {
      row.classList.add('shadowGlow'); // TEMPORARY
    });
  });
  box.addEventListener('drag', (e) => {
    mouseX = e.clientX, mouseY = e.clientY;
    if (!mouseX && !mouseY){
      firefoxClientPos();
      mouseX = dragEvent.clientX, mouseY = dragEvent.clientY;
    }
    console.log(`x: ${mouseX}, y: ${mouseY}`);
    //console.log(`x: ${mouseX}, y: ${mouseY}`);
    box.style.position = 'absolute';
    box.style.zIndex = '10';
    box.style.left = `calc(${mouseX}px - 38%)`;
    box.style.top = `calc(${mouseY}px - 19%)`;
  });
  box.addEventListener('dragend', (e) => {
    box.classList.remove('dragging');
    box.classList.add('fadeAway');
    box.addEventListener('animationend', () => {
      editableRows.forEach((row) => {
        row.classList.remove('shadowGlow'); // TEMPORARY
      });
      box.remove();
      addEmptyBox();
    });
    let currPos = {x: mouseX, y: mouseY};
    let closest = findClosestElem(getPlayerDiv(currPos), currPos);
    if (closest){
      insertPlyr(closest);
    }
  });
}

const addEmptyBox = () => {
  let box = document.getElementsByClassName('emptyPlyrBox')[2];
  let boxesBox = document.getElementsByClassName('dropOvrflw')[0];
  let newBox = box.cloneNode(true);
  boxDrag(newBox);
  boxesBox.appendChild(newBox);
}

const findClosestElem = (elementArray, currPos) => {
  if (!elementArray){
    return false;
  }
  const currX = currPos.x, currY = currPos.y;
  const len = elementArray.length;
  let closestElem = {elem: null, direction: null, xDist : 5000};
  for (let m = 0; m < len; m++){
    const elemBox = elementArray[m].getBoundingClientRect();
    const leftDist = Math.abs(elemBox.left - currX), rightDist = Math.abs(elemBox.right - currX);
    let closest, direction;
    if (leftDist < rightDist){
      closest = leftDist;
      direction = 'left';
    } else {
      closest = rightDist;
      direction = 'right';
    }
    if (closest < closestElem.xDist){
      closestElem.elem = elementArray[m];
      closestElem.xDist = closest;
      closestElem.direction = direction;
    }
  }
  return closestElem;
}

const getPlayerDiv = (currPos) => {
  const currX = currPos.x, currY = currPos.y;
  let editableDiv = false;
  
  const allDivs = document.elementsFromPoint(currX, currY);
  allDivs.forEach((div) => {
    if (div.classList.contains('editableRow')){
      editableDiv = div.children;
    }
  });
  return editableDiv;
}

const insertPlyr = (nearElmObj) => {
  let parent = nearElmObj.elem.parentElement;

  let sidePlayer = document.createElement('div');
  sidePlayer.classList.add('SidePlayer');
  //sidePlayer.style.width = nearElmObj.elem.style.width;

  let plyr = document.createElement('div');
  let newPlyr = plyrSetup(plyr, "https://www.youtube.com/watch?v=-oyqNzNxLhk", defaultSettings);
  

  let plyrInput = document.createElement('input');
  plyrInput.type = 'text';
  plyrInput.placeholder = 'Input a Youtube Link';
  plyrInput.classList.add('videoLinkInput');
  
  sidePlayer.appendChild(plyr);
  sidePlayer.appendChild(plyrInput);

  plyrInputLinker(newPlyr, plyrInput);
  newPlyr.plyr.on("play", () => {hideInput(newPlyr)});
  newPlyr.plyr.on("pause", () => {showInput(newPlyr)});

  let oldOrder = Number(nearElmObj.elem.style.order);
  let direction = nearElmObj.direction;
  let newOrder = (direction == 'left') ? oldOrder - 1 : oldOrder + 1;
  sidePlayer.style.order = newOrder;
  orderShifter(parent,newOrder, direction);
  
  
  parent.appendChild(sidePlayer);
}

const orderShifter = (parent, order, direction) => {
  let allChildren = parent.children;
  let len = allChildren.length;
  for (let m = 0; m < len; m++){
    let currOrder = Number(allChildren[m].style.order);
    if (direction == 'left' && currOrder <= order){
      allChildren[m].style.order = currOrder - 1;
    } else if (direction == 'right' && currOrder >= order){
      allChildren[m].style.order = currOrder + 1;
    }
  }
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

  dragListener();

  document.addEventListener('click', (e) => {
    //let list = document.querySelectorAll('.editableRow')[0].children;
    //let position = {x : e.clientX, y: e.clientY};
    //let closest = findClosestElem(getPlayerDiv(position), position);
    //if (!closest) {return};
    //insertPlyr(closest);
  });

});