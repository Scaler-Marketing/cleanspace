export function initButtons() {
  const buttons = document.querySelectorAll(".button");

  if (!buttons.length) {
    console.error("No buttons found.");
    return;
  }

  // Initialize the pixel transition effect for each button.
  buttons.forEach((button) => setButton(button));
}

function setButton(button) {
// split the button text into spans for lines and words using split-type
  const buttonEls = new SplitType(button.querySelector('.button_label'), {
    types: "lines, words",
    tagName: "span",
  });

  // stagger words when mouse hover
  button.addEventListener("mouseenter", () => {
    gsap.to(buttonEls.words, {
      yPercent: -100,
      stagger: 0.01,
      duration: 0.5,
      ease: "expo.out",
    });
  });

  // stagger words back when mouse leaves
  button.addEventListener("mouseleave", () => {
    gsap.to(buttonEls.words, {
      yPercent: 0,
      stagger: 0.02,
      duration: 0.5,
      ease: "expo.out",
    });
  });
}