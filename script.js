const slide = document.getElementById("slide");
const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");

// DESKTOP

let unit = 0;
const cardHeight = 300;
const totalCards = 4;
const maxUnit = -(cardHeight * (totalCards - 1));

downArrow.onclick = () => {
  if (unit > maxUnit) {
    unit = unit - cardHeight;
    slide.style.top = unit + "px";
  } else {
    unit = 0;
    slide.style.top = unit + "px";
  }
};

upArrow.onclick = () => {
  if (unit < 0) {
    unit = unit + cardHeight;
    slide.style.top = unit + "px";
  } else {
    unit = maxUnit;
    slide.style.top = unit + "px";
  }
};

// MOBILE

let touchStartY = 0;
let touchEndY = 0;

slide.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
});

slide.addEventListener("touchend", (event) => {
  touchEndY = event.changedTouches[0].clientY;
  handleSwipe();
});

const handleSwipe = () => {
  const swipeDistance = touchEndY - touchStartY;
  if (swipeDistance > 50) {
    swipeUp();
  } else if (swipeDistance < -50) {
    swipeDown();
  }
};

const swipeDown = () => {
  if (unit > maxUnit) {
    unit = unit - cardHeight;
    slide.style.top = unit + "px";
  } else {
    unit = 0;
    slide.style.top = unit + "px";
  }
};

const swipeUp = () => {
  if (unit < 0) {
    unit = unit + cardHeight;
    slide.style.top = unit + "px";
  } else {
    unit = maxUnit;
    slide.style.top = unit + "px";
  }
};

downArrow.onclick = () => {
  swipeDown();
};

upArrow.onclick = () => {
  swipeUp();
};

// CONTACT

const contact = (event) => {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_mgjtqol",
      "template_e7lkzxj",
      event.target,
      "JoRtbLYHIY8V977QW"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact us directly at staghorn.treeservice@gmail.com"
      );
    });
};

let isModalOpen = false;

const toggleModal = () => {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
};

const toggleModalAndScroll = () => {
  toggleModal();
  setTimeout(() => {
    const parallaxContainer = document.getElementById("parallax-container");
    parallaxContainer.scrollTo({ top: 0, behavior: "smooth" });
  }, 100); // Add a delay of 100 milliseconds
};

// BURGER MENU

const openMenu = () => {
  document.body.classList += " menu--open";
};

const closeMenu = () => {
  document.body.classList.remove("menu--open");
};

// GALLERy

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const navLinks = document.querySelectorAll(".slider__nav a");
  let currentSlide = 0;
  let manualSlideSelected = false; // Track manual slide selection
  let autoScrollInterval; // Store the auto-scroll interval
  let isInViewport = false; // Track if the slider is in the viewport

  // Check if the element is in the viewport
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function scrollToNextSlide() {
    if (isInViewport && !manualSlideSelected) {
      currentSlide = (currentSlide + 1) % navLinks.length;
    }
    updateSlideOpacity();
    const slideIndex = currentSlide;

    slider.scrollTo({
      left: slider.clientWidth * slideIndex,
      behavior: "smooth",
    });
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(scrollToNextSlide, 4000);
  }

  function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Use Intersection Observer to detect when the slider enters the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isInViewport = true;
        startAutoScroll();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(slider);

  function updateSlideOpacity() {
    navLinks.forEach(function (link, index) {
      if (index === currentSlide) {
        link.style.opacity = 1;
      } else {
        link.style.opacity = 0.75;
      }
    });
  }

  updateSlideOpacity(); // Set initial opacity

  slider.addEventListener("scroll", function () {
    if (!manualSlideSelected) {
      const slideIndex = Math.round(slider.scrollLeft / slider.clientWidth);
      currentSlide = slideIndex;
      updateSlideOpacity();
    }
  });

  navLinks.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      if (!manualSlideSelected) {
        currentSlide = index; // Set the selected slide index
        manualSlideSelected = true; // Mark manual slide selection

        updateSlideOpacity();
        pauseAutoScroll(); // Pause the auto-scroll interval

        slider.scrollTo({
          left: slider.clientWidth * currentSlide,
          behavior: "smooth",
        });

        setTimeout(() => {
          manualSlideSelected = false; // Reset manual slide selection after a delay
          startAutoScroll(); // Restart the auto-scroll
        }, 1000); // Delay in milliseconds before re-enabling auto-scroll
      }
    });
  });
});
