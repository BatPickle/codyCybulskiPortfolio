/* 
var swiper = new Swiper(".centered-slide-carousel", {
    centeredSlides: true,
    loop: true, // Enables infinite scrolling
    spaceBetween: 30,
    slideToClickedSlide: true,
    pagination: {
      el: ".centered-slide-carousel .swiper-pagination",
      clickable: true,
    },
    speed: 500, 
    touchRatio: 0.5,
    resistanceRatio: 0.85,
    initialSlide: 2, // Start at the middle card
    breakpoints: {
      1920: { slidesPerView: 4, spaceBetween: 30 },
      1028: { slidesPerView: 2, spaceBetween: 10 },
      990: { slidesPerView: 1, spaceBetween: 0 }
    },
    on: {
        init: function () {
          setTimeout(() => {
            swiper.slideTo(2, 0, false); // Correct positioning
            swiper.loopFix(); // Ensure slides don't disappear
          }, 100);
        },
        slideChange: function () {
          setTimeout(() => {
            swiper.slideTo(swiper.activeIndex, 0, false); // Keeps things centered after pagination clicks
          }, 50);
        }
      }
      
  }); */


  
/*   breakpoints: {
    1920: { slidesPerView: 4, spaceBetween: 30 },
    1028: { slidesPerView: 2, spaceBetween: 10 },
    600: { slidesPerView: 1, spaceBetween: 5 } // Ensures 1 card is visible on mobile
  }
  

 */

  

  var swiper = new Swiper(".my-3d-carousel", {
    direction: 'horizontal',
    loop: true, 
    centeredSlides: true,
    spaceBetween: 30,
    slideToClickedSlide: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 30,
      stretch: 50,
      depth: 150,
      modifier: 0.5,
      slideShadows: false,
    },
    slidesPerView: 3,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChangeTransitionEnd: function () { 
        requestAnimationFrame(() => { // Ensures changes happen without blocking interaction
          swiper.slides.forEach((slide, index) => {
            const distance = Math.abs(swiper.realIndex - index);
            slide.style.transition = "opacity 0.5s ease";
            slide.style.opacity = Math.max(0.5, 1 - distance * 0.2); 
          });
        });
      }
    }
});
