var l;document.addEventListener("DOMContentLoaded",()=>{l=document.getElementById("Dvideo");var e="https://dfflvukqjg5l4.cloudfront.net/leo480p_no_audio.m3u8";const n={};if(Hls.isSupported()){var o=new Hls;o.loadSource(e);o.attachMedia(l);d(o)}function t(o){window.hls.levels.forEach((e,n)=>{if(e.height===o){window.hls.currentLevel=n}})}function d(e){window.hls=e}});