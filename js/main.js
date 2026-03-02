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
  let started = false;

  function typeEffect() {
    if (index < text.length) {
      textElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 60);
    }
  }

  function handleScroll() {
    const rect = textElement.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && !started) {
      started = true;
      typeEffect();
    }
  }

  window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("loader").classList.add("hide-loader");
    }, 2500); // المدة اللي الرسالة تفضل فيها
  });
