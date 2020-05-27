const playBtn = document.querySelector(".playBtn");
const video=document.querySelector(".vid");
const song=document.querySelector(".aud");
const soundSec=document.querySelectorAll(".sound-section button");
const duration=document.querySelectorAll(".timer-section button");
const timeDisplay=document.querySelector(".player-section h1");
const outline=document.querySelector(".moving-svg circle");
const wholeContent=document.querySelector(".app");

let i;
let fakeTime=600;

timeDisplay.textContent=`${Math.floor(fakeTime/60)}:0${Math.floor(fakeTime%60)}`;
outline.style.strokeDasharray = outline.getTotalLength();     //strokeDasharray specifies the dash length
outline.style.strokeDashoffset = outline.getTotalLength();    //specifies where dash of a stroke will begin

//hide/display on mouse move
let time=1;
let delay=setInterval(delayChk,1000);
wholeContent.addEventListener("mousemove",show);
function delayChk(){
    if(playBtn.src=="file:///C:/Users/Ajay/Desktop/My%20Projects/WebDev/Meditation%20app/svg/pause.svg"){
    if(time==4)
    {
        wholeContent.style.opacity=0;
        time=1;
    }
    time++;
}
}
function show(){
    wholeContent.style.opacity=1;
    time=1;
    clearInterval(delay);
    delay=setInterval(delayChk,1000);
}


const chkplaying = song => {
    if(song.paused)
    {
        song.play();
        video.play();
        playBtn.src="./svg/pause.svg";
    }else{
        song.pause();
        video.pause();
        playBtn.src="./svg/play.svg";
    }
};

song.addEventListener("timeupdate",function(){      //song.ontimeupdate=function(){myscript} one n the same
    let currentTime=song.currentTime;
    let remainingTime=fakeTime-currentTime;
    let min=Math.floor(remainingTime/60);
    let sec=Math.floor(remainingTime%60);
    timeDisplay.textContent=`${min}:${sec}`;
    let progress = outline.getTotalLength() - (currentTime/fakeTime)*outline.getTotalLength();
    outline.style.strokeDashoffset=progress;
    if(remainingTime==0)
    {
        song.pause();
        song.currentTime=0;
        video.pause();
        play.src="./svg/play.svg";
    }
});

for(i=0;i<duration.length;i++)
{
    duration[i].addEventListener("click",function(){
        fakeTime=this.getAttribute("data-time");
        timeDisplay.textContent=`${Math.floor(fakeTime/60)}:0${(fakeTime%60)}`;

    });
}

for(i=0;i<soundSec.length;i++)
{
soundSec[i].addEventListener("click",function() {
    song.src=this.getAttribute("data-sound");
    video.src=this.getAttribute("data-video");
    chkplaying(song);
});
}

playBtn.addEventListener("click", function() {
    chkplaying(song);
});

