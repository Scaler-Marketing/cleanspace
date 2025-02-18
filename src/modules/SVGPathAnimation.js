export function setPathAnimations() {
  const paths = document.querySelectorAll("[path-reveal]");

  if (!paths) {
    console.error("No paths found.");
    return;
  }

  paths.forEach((path) => {
    setPathAnimation(path);
  });
}

function setPathAnimation(path) {
  // use GSAP drawSVG plugin to animate path drawing  
  const pathEls = path.querySelectorAll("path");
  const duration = path.dataset.duration ? parseFloat(path.dataset.duration) : 3;

  gsap.set(pathEls, { drawSVG: "0%" });


  // Set ScrollTrigger to trigger animation when path is in view
  ScrollTrigger.create({
    trigger: path,
    start: "top center",
    onEnter: () => {
      gsap.to(pathEls, {
        drawSVG: "100%",
        duration: duration,
        ease: "expo.out",
      });
    },
  });
}