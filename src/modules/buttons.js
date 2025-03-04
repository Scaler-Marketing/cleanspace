export function initButtons() {
  // Register the Finsweet CMS load callback using the official API.
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    (listInstances) => {
      console.log("cmsload Successfully loaded!");
      // Loop through all CMSList instances on the page.
      listInstances.forEach((listInstance) => {
        // Listen for the 'renderitems' event.
        listInstance.on("renderitems", (renderedItems) => {
          setButtons();
        });
      });
    },
  ]);

  // Run the initial setup for buttons.
  setButtons();
}

function setButtons() {
  // Only select buttons that haven’t been initialized yet.
  const buttons = document.querySelectorAll(".button:not([data-initialized])");

  if (!buttons.length) {
    console.error("No new buttons found.");
    return;
  }

  // Initialize each new button.
  buttons.forEach((button) => {
    button.setAttribute("data-initialized", "true");
    setButton(button);
  });
}

function setButton(button) {
  // Split the button text into spans for lines and words using SplitType.
  const buttonEls = new SplitType(button.querySelector(".button_label"), {
    types: "lines, words",
    tagName: "span",
  });

  const bg = button.querySelector(".button_bg");
  const icon = button.querySelectorAll(".button_icon-el");

  // Stagger words on mouse enter.
  button.addEventListener("mouseenter", () => {
    gsap.to(buttonEls.words, {
      yPercent: -100,
      stagger: 0.01,
      duration: 0.5,
      ease: "expo.out",
    });
    gsap.to(bg, {
      scaleX: 1,
      duration: 0.5,
      ease: "expo.out",
    });

    if (icon[0].classList.contains("move-horizontal")) {
      gsap.to(icon, {
        xPercent: 100,
        duration: 0.5,
        ease: "expo.out",
      });
    } else if (icon[0].classList.contains("move-vertical")) {
      gsap.to(icon, {
        yPercent: 100,
        duration: 0.5,
        ease: "expo.out",
      });
    }
  });

  // Revert animations on mouse leave.
  button.addEventListener("mouseleave", () => {
    gsap.to(buttonEls.words, {
      yPercent: 0,
      stagger: 0.02,
      duration: 0.5,
      ease: "expo.out",
    });
    gsap.to(bg, {
      scaleX: 0,
      duration: 0.3,
      ease: "expo.out",
    });

    if (icon[0].classList.contains("move-horizontal")) {
      gsap.to(icon, {
        xPercent: 0,
        duration: 0.3,
        ease: "expo.out",
      });
    } else if (icon[0].classList.contains("move-vertical")) {
      gsap.to(icon, {
        yPercent: 0,
        duration: 0.3,
        ease: "expo.out",
      });
    }
  });
}
