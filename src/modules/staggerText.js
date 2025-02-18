// Link timelines to scroll position
function createScrollTrigger(triggerElement, elements, start, end, stagger, delay, withScroll) {
  const trigger = {
    trigger: triggerElement,
    scrub: true,
    start,
    fastScrollEnd: 500,
    preventOverlaps: "scroll-text",
  };

  if (!withScroll) {
    trigger.onEnter = () => {
      gsap.to(elements, {
        yPercent: 0,
        opacity: 1,
        stagger: stagger,
        duration: 1.5,
        ease: "power4.out",
        delay: Number(delay),
      });
    };

    gsap.timeline({ scrollTrigger: trigger });
  } else {
    trigger.end = end;
    gsap
      .timeline({
        scrollTrigger: trigger,
      })
      .to(words, {
        yPercent: 0,
        opacity: 1.5,
        stagger: stagger,
        duration: 1,
        ease: "none",
      });
  }
}

export function setStaggerText() {
  // Split all words on the brand core section
  const textEls = document.querySelectorAll('[stagger-text]');

  textEls.forEach((el) => {
    const type = el.getAttribute("stagger-text");
    let staggerTextEls;

    console.log(type);

    if (el.classList.contains('w-richtext')) {
      staggerTextEls = new SplitType(el.querySelectorAll('p, li, h2, h3'), {
        types: "words, lines",
        tagName: "span",
      });

    } else {
      staggerTextEls = new SplitType(el, {
        types: type === "words" ? "words" : "lines",
        tagName: "span",
      });
    }

    gsap.set(type === "words" ? staggerTextEls.words : staggerTextEls.lines,  { yPercent: 100, opacity: 0 });

    el.classList.add("init");

      const words =
        type === "words"
          ? el.querySelectorAll(".word")
          : el.querySelectorAll(".line"),
      startVal = el.dataset.startPos || "bottom bottom",
      endVal = el.dataset.endPos || "bottom center",
      stagger = el.dataset.stagger || 0.05,
      delay = el.dataset.delay || 0,
      withScrollTrigger = el.dataset.withScroll || false;

    createScrollTrigger(
      el,
      words,
      startVal,
      endVal,
      stagger,
      delay,
      withScrollTrigger
    );

  });
}
