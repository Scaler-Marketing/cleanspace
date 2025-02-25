// Link timelines to scroll position
function createScrollList(
  triggerElement,
  elements,
  start,
  stagger,
  delay,
) {
  gsap.set(elements, {
    yPercent: 100,
    opacity: 0,
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      scrub: true,
      start,
      onEnter: () => {
        gsap.to(elements, {
          yPercent: 0,
          opacity: 1,
          stagger,
          ease: "power4.out",
          delay: Number(delay),
        });
      },
    },
  });
}

export function setStaggerElements() {
  const list = document.querySelectorAll("[stagger-list]");

  if (!list) {
    return;
  }

  list.forEach((el) => {
    const elements = el.querySelectorAll("[stagger-el]"),
      startVal = el.dataset.startPos || "top bottom",
      stagger = el.dataset.stagger || 0.05,
      delay = el.dataset.delay || 0;
    
    if (!elements) {
      return;
    }
    
    createScrollList(el, elements, startVal, stagger, delay);
  });
}
