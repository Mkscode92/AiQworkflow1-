let e="Ww6rEz";
let t="TViP4_VTV1.live";
const d=()=>window.millicast.Director.getSubscriber({streamName:t,streamAccountId:e});
const n=new window.millicast.View(t,d);const i=new Set;
const a=new Map;

n.on("broadcastEvent",e=>{const{name:t,data:d}=e;
  switch(t) {
    case"active":
      i.add(d.sourceId);
      c(d.sourceId);
      break;
    case"inactive":
      i["delete"](d.sourceId);
      o(d.sourceId);
      break
  }
});

const c=async e=> {
  const t=new MediaStream;
  const d=await n.addRemoteTrack("video",[t]);
  const i=await n.addRemoteTrack("audio",[t]);
  a.set(e,{videoMediaId:d.mid,audioMediaId:i.mid});
  s(t,e);
  await n.project(e,[{trackId:"video",mediaId:d.mid,media:"video"},{trackId:"audio",mediaId:i.mid,media:"audio"}])
};

const o=async e=>{const t=document.getElementById(e);
const d=a.get(e);

a["delete"](e);
await n.unproject([d.videoMediaId,d.audioMediaId]);
document.getElementById(e).remove()};

const s=(e,t)=>{const d=document.getElementById("MainMediaBox");
const i=document.getElementById("SidePlayer1");
const n=document.getElementById("SidePlayer2");
const a=document.getElementById("SidePlayer3");
const c=document.createElement("video");c.id=t;

c.srcObject=e;c.autoplay=true;c.style.width="69%";
c.style.height="90%";c.style.position="absolute";

if (d.children.length==1) {
  c.controls=true;
  d.appendChild(c)
}else if (i.children.length==0) {
  i.appendChild(c);
  c.style.position="relative";c.style.width="100%";
  c.style.height="90%"
}else if (n.children.length==0) {
  n.appendChild(c);
  c.style.width="100%";
  c.style.height="100%"
}else if (i.children.length==0) {
  a.appendChild(c);
  c.style.width="100%";
  c.style.height="100%"}
};
try{n.connect()}catch(l){n.reconnect()}