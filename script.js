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

//template_44r65j2
//service_mgjtqol
//publickey

const contact = (event) => {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_mgjtqol",
      "template_44r65j2",
      event.target,
      "bAPQiLqVIQ4Lxqm7e"
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

const toggleModal = () => {};
