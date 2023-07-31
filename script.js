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
}

const swipeDown = () => {
  if (unit > maxUnit) {
    unit = unit - cardHeight;
    slide.style.top = unit + "px";
  } else {
    unit = 0;
    slide.style.top = unit + "px";
  }
}

const swipeUp = () => {
  if (unit < 0) {
    unit = unit + cardHeight;
    slide.style.top = unit + "px";
  } else {
    unit = maxUnit;
    slide.style.top = unit + "px";
  }
}

downArrow.onclick = () => {
  swipeDown();
};

upArrow.onclick = () => {
  swipeUp();
};
