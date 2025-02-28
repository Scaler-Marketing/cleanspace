function initFocusAreas() {
  const el = document.querySelector("[data-focus-area-component]");

  if (!el) {
    return;
  }

  const tabs = el.querySelectorAll("[data-focus-tab]");
  const content = el.querySelectorAll("[data-focus-content]");
  const imgs = el.querySelectorAll("[data-focus-img]");

  if (tabs.length === 0 || content.length === 0 || imgs.length === 0) {
    return;
  }

  // set scrollTrigger for each tab
  tabs.forEach((tab, i) => {
    const id = tab.dataset.focusTab;
    const trigger = document.querySelector(`[data-focus-trigger="${id}"]`);
    const content = el.querySelector(`[data-focus-content="${id}"]`);
    const img = el.querySelector(`[data-focus-img="${id}"]`);
    const imgEl = img.querySelector('img');

    if (!trigger || !content || !img) {
      return;
    }

    if (i > 0) {
      gsap.set(img, { clipPath: `inset(50%)` });
      gsap.set(content, { yPercent: 20, opacity: 0 });
      gsap.set(imgEl, { scale: 1.1 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top bottom",
        end: "bottom bottom",
        markers: false,
        scrub: 1,
        id: `tab-${i}`,
        onEnter: () => {
          if (i === 0) {
            return;
          }
          updateTabLine(tab);

          // animate img using GSAP and inset clip path
          gsap.to(img, {
            clipPath: `inset(0%)`,
            duration: 1,
            ease: "expo.out",
          });

          gsap.to(imgEl, { scale: 1, duration: 1, ease: "expo.out" });

          // animate content using GSAP
          gsap.to(content, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          });
        },
        onEnterBack: () => {
          // if (i === tabs.length - 1) {
          //   return;
          // }

          updateTabLine(tab);

          // animate img using GSAP and inset clip path
          gsap.to(img, {
            clipPath: `inset(0%)`,
            duration: 1,
            ease: "expo.out",
          });

          gsap.to(imgEl, { scale: 1, duration: 1, ease: "expo.out" });

          // animate content using GSAP
          gsap.to(content, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          });
        },
        onLeave: () => {
          if (i === tabs.length - 1) {
            return;
          }

          gsap.to(imgEl, { scale: 1.1, duration: 1, ease: "expo.out" });

          // animate content out using GSAP
          gsap.to(content, {
            yPercent: -20,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          });
        },
        onLeaveBack: () => {
          if (i === 0) {
            return;
          }

          // animate img using GSAP and inset clip path
          gsap.to(img, {
            clipPath: `inset(50%)`,
            duration: 1,
            ease: "expo.out",
          });

          // animate content using GSAP
          gsap.to(content, {
            yPercent: 20,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          });
        },
      },
    });
  });

  function updateTabLine(tab) {
    console.log("updateTabLine");
    tabs.forEach((t) => {
      t.classList.remove("is-active");
    });
    tab.classList.add("is-active");
    // use GSAP Flip plugin to move the .focus-areas_tab-line element from the previously active tab to the active tab
    const line = document.querySelector(".focus-areas_tab-line");
    const state = Flip.getState(line);
    // const activeTab = document.querySelector(".focus-areas_tab.is-active");
    // append the line to the active tab
    tab.appendChild(line);

    Flip.from(state, {
      duration: .5,
      ease: "expo.out",
      // absolute: true,
    });
  }

}

document.addEventListener("DOMContentLoaded", initFocusAreas);