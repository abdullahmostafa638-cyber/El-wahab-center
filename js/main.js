$(document).ready(function(){

    // Blog Carousel
    $('.blog-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 800,
        responsive:{
            0:{ items:1 },
            576:{ items:2 },
            992:{ items:3}
        }
    });

});

const textElement = document.getElementById("typingText");
const text = textElement.getAttribute("data-text");
let index = 0;

function typeEffect() {
  if (index < text.length) {
    textElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 60);
  }
}

// تشغيل الكتابة
typeEffect();
function handleScroll() {
  const rect = textElement.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100 && !started) {
    started = true;
    typeEffect();
  }
}

window.addEventListener("scroll", handleScroll);

const iframe = document.getElementById("eventVideo");
const playBtn = document.getElementById("playBtn");
const overlay = document.getElementById("videoOverlay");

const player = new Vimeo.Player(iframe);

// تشغيل الفيديو من زرار البلاي
playBtn.addEventListener("click", () => {
  player.play();
  playBtn.style.display = "none";
});

// Toggle play/pause عند الضغط على overlay
overlay.addEventListener("click", () => {
  player.getPaused().then(paused => {
    if(paused){
      player.play();
      playBtn.style.display = "none";
    } else {
      player.pause();
      playBtn.style.display = "flex";
    }
  });
});

// لما الفيديو يخلص
player.on("ended", () => {
  playBtn.style.display = "flex";
});


// 🔥 الدالة المهمة
function pauseAllVideos() {

  document.querySelectorAll(".event-video1").forEach(v => {
    v.pause();
  });

  document.querySelectorAll(".play-button").forEach(b => {
    b.style.display = "flex";
  });

}



const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const updateCounter = () => {

const target = +counter.getAttribute("data-target");
const count = +counter.innerText;

const increment = target / 100;

if(count < target){

counter.innerText = Math.ceil(count + increment);
setTimeout(updateCounter,20);

}else{

counter.innerText = target;

}

};

updateCounter();

});

const videos = [
  {id:"video1", btn:"video1"},
  {id:"video2", btn:"video2"},
  {id:"video3", btn:"video3"},
  {id:"video4", btn:"video4"}
];

const players = [];

// إنشاء مشغلات Vimeo لكل فيديو
videos.forEach(v => {
  const iframe = document.getElementById(v.id);
  const player = new Vimeo.Player(iframe);
  const btn = document.querySelector(`.play-button[data-video="${v.btn}"]`);
  const overlay = document.querySelector(`.video-overlay[data-video="${v.id}"]`);

  players.push({player: player, btn: btn});

  // زرار البلاي
  btn.addEventListener("click", () => {
    pauseAll();
    player.play();
    btn.style.display = "none";
  });

  // Overlay للتحكم بالضغط على الفيديو
  overlay.addEventListener("click", () => {
    player.getPaused().then(paused => {
      if(paused){
        pauseAll();
        player.play();
        btn.style.display = "none";
      } else {
        player.pause();
        btn.style.display = "flex";
      }
    });
  });

  // لو الفيديو اتوقف
  player.on("pause", () => {
    btn.style.display = "flex";
  });

  // لو الفيديو خلص
  player.on("ended", () => {
    btn.style.display = "flex";
  });
});

// دالة لإيقاف كل الفيديوهات
function pauseAll() {
  players.forEach(p => {
    p.player.pause();
    p.btn.style.display = "flex";
  });
}