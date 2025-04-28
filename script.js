
/* SWIPER FUNCTIONALITY */
var swiper = new Swiper(".my-3d-carousel", {
  loop: true,
  keyboard: true,
  mousewheel: true,
  centeredSlides: true,
  slidesPerView: "auto", // Auto-adjusts based on width
  spaceBetween: 250,
  slideToClickedSlide: false,
  effect: "coverflow",
  speed: 600,
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
  breakpoints: {
    2000: {
      slidesPerView: 3,
      spaceBetween: 650,
  },
    1600: {
        slidesPerView: 3,
        spaceBetween: 550,
    },
    1150: {
      slidesPerView: 3,
      spaceBetween: 250,
  },
    768: {
        slidesPerView: 3,
        spaceBetween: 150,
    },
    480: {
        slidesPerView: 2,
        spaceBetween: 150,
    },
    0: { // Default for all smaller screens
        slidesPerView: 2,
        spaceBetween: 50,
    }
}

});

window.addEventListener("resize", function () {
  swiper.update(); // Recalculates layout for smoother transitions
});




// Ensure clicking a slide DOES NOT move the carousel
document.querySelectorAll(".swiper-slide").forEach(slide => {
  slide.removeEventListener("click", function () {
    const clickedIndex = swiper.slides.indexOf(this);
    swiper.slideTo(clickedIndex);
  });
});

// Ensure modal ONLY opens when clicking a centered slide
document.querySelectorAll(".swiper-slide").forEach(slide => {
  slide.addEventListener("click", function () {
    // Check if the slide is centered within the viewport
    const rect = slide.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const isCentered = rect.left >= screenWidth * 0.3 && rect.right <= screenWidth * 0.7;

    if (slide.classList.contains("swiper-slide-active") && isCentered) {
      const modalButton = slide.querySelector(".open-modal");
      if (modalButton) {
        const modalId = modalButton.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove("hidden");
        }
      }
    }
  });
});





// Close modal when clicking the close button
document.querySelectorAll(".close-modal").forEach(button => {
  button.addEventListener("click", function () {
    const modal = this.closest(".modal");

    if (modal) {
      modal.classList.add("hidden");
      modal.style.display = "none";
    }
  });
});

document.querySelectorAll(".open-modal").forEach(button => {
  button.addEventListener("click", function () {
    const modalId = this.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.style.display = "flex";
    }
  });
});

// Close modal when clicking outside the modal content
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
      modal.style.display = "none";
    }
  });
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



let isTransitioning = false;
swiper.on("slideChangeTransitionStart", () => {
  isTransitioning = true;
});
swiper.on("slideChangeTransitionEnd", () => {
  isTransitioning = false;
});

document.querySelector(".swiper-button-next").addEventListener("click", function () {
  if (!isTransitioning) swiper.slideNext();
});
document.querySelector(".swiper-button-prev").addEventListener("click", function () {
  if (!isTransitioning) swiper.slidePrev();
});




/* keys to navigate */
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { // Change this to your preferred key
      let activeSlide = document.querySelector(".swiper-slide-active"); // Get active slide
      let modalId = activeSlide.querySelector("button").dataset.modal; // Retrieve modal ID
      let modal = document.getElementById(modalId); // Find modal element

      if (modal) {
          modal.classList.remove("hidden"); // Open modal
      }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { 
      document.querySelectorAll(".modal").forEach(modal => modal.classList.add("hidden"));
  }
});



/* Download button */
document.getElementById("downloadBtn").addEventListener("click", function() {
  this.classList.remove("border-red-500", "shadow-red-500/50", "hover:border-red-600", "hover:shadow-red-600/70"); // Remove red styles
  this.classList.add("border-green-500", "shadow-green-500/50"); // Apply green styles
});




/* konami code */
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let userInput = [];
let heartsContainer = document.createElement('div'); // Create the heart container
heartsContainer.className = "hearts-overlay hidden"; // Initially hidden
document.body.appendChild(heartsContainer);

document.addEventListener("keydown", (event) => {
    userInput.push(event.key);
    
    // Check if input matches Konami Code
    if (userInput.join("").includes(konamiCode.join(""))) {
        showHearts();
        userInput = []; // Reset input
    }
});

function showHearts() {
    heartsContainer.innerHTML = ''; // Clear previous hearts
    heartsContainer.classList.remove("hidden");

    for (let i = 0; i < 3; i++) {
        let heart = document.createElement("div");
        heart.className = "heart";
        heartsContainer.appendChild(heart);
    }

    setTimeout(() => {
        heartsContainer.classList.add("hidden");
    }, 1000); // Hearts disappear after 1 second
}


/* Copy Email */
document.getElementById("copyEmail").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the link from navigating
  const email = "codycybulski@gmail.com"; // Replace with your actual email

  navigator.clipboard.writeText(email).then(() => {
      alert("Email copied to clipboard!"); // Optional: Notify user
  }).catch(err => {
      console.error("Failed to copy: ", err);
  });
});
