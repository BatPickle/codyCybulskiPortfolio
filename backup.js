
/* SWIPER FUNCTIONALITY */
var swiper = new Swiper(".my-3d-carousel", {
    direction: "horizontal",
    loop: true,
    centeredSlides: true,
    spaceBetween: 30,
    slideToClickedSlide: true,
    slidesPerView: 3,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 30,
      stretch: 50,
      depth: 150,
      modifier: 0.5,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        updateSlideOpacity(); // Ensure opacity is set correctly at first load
      },
      slideChangeTransitionEnd: function () {
        updateSlideOpacity(); // Update opacity correctly after every transition
      }
    }
  });
  
  
  /* SLIDE OPACITY */
  function updateSlideOpacity() {
    requestAnimationFrame(() => {
      swiper.slides.forEach((slide) => {
        slide.classList.remove("opacity-100", "opacity-50");
  
        // Use Swiper’s built-in active class to detect center slide
        if (slide.classList.contains("swiper-slide-active")) {
          slide.classList.add("opacity-100"); // Fully visible
        } else {
          slide.classList.add("opacity-50"); // Dimmed
        }
      });
    });
  }
  
  
  /* POWER LIGHT FLICKER */
  function flickerLight() {
    const powerLight = document.querySelector(".power-light");
  
    if (!powerLight) return;
  
    function flicker() {
      const randomOpacity = Math.random() * (0.6 - 0.2) + 0.2; // Random opacity between 0.2 and 0.6
      powerLight.style.opacity = randomOpacity;
  
      // If opacity is above 0.4, add glow effect
      if (randomOpacity > 0.4) {
        powerLight.style.boxShadow = "0 0 15px 4px #ff0000";
      } else {
        powerLight.style.boxShadow = "none";
      }
  
      // Random flicker timing (100ms - 500ms)
      setTimeout(flicker, Math.random() * (500 - 100) + 100);
    }
    flicker();
  }
  window.onload = flickerLight;
  
  
  /* Footer Name Color Change */
    document.getElementById("footerName").addEventListener("click", function () {
      const colors = [
        "text-red-500", "text-blue-500", "text-green-800", "text-yellow-800", "text-purple-500",
        "text-rose-600", "text-emerald-700", "text-indigo-400", "text-orange-600", "text-cyan-700",
        "text-pink-600", "text-teal-600", "text-lime-700", "text-fuchsia-600", "text-violet-700",
        "text-sky-500", "text-amber-500", "text-gray-700", "text-stone-500", "text-neutral-700"
      ];
      
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
      // Remove previous color classes
      this.classList.remove(...colors);
  
      // Add new random color
      this.classList.add(randomColor);
    });
  
  